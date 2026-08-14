import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { Resend } from 'resend'
import { sendEmailSchema } from './server/schema.js'
import { resolveRecipients } from './server/sucursal-emails.js'
import { buildDepositoEmailHtml } from './server/email-template.js'
import { createRateLimiter } from './server/rate-limit.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, 'dist')

const PORT = process.env.PORT || 3000
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL

if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
  // Fail-fast: sin estas variables el servidor no puede enviar correos en producción
  console.error('❌ Faltan variables de entorno requeridas: RESEND_API_KEY y/o RESEND_FROM_EMAIL')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)
const app = express()

// Dokploy sirve detrás de un reverse proxy — sin esto, req.ip sería siempre
// la IP del proxy y el rate limiter agruparía a todos los usuarios en una sola IP
app.set('trust proxy', 1)

// Body pequeño: file1/file2 son URLs de Firebase Storage, no archivos en base64
app.use(express.json({ limit: '256kb' }))

const emailRateLimiter = createRateLimiter({ windowMs: 60_000, max: 5 })

const SUBJECTS = {
  solicitud: 'Nueva Solicitud de Depósito',
  actualizacion: 'Nueva Actualización de Depósito',
}

app.post('/api/send-email', emailRateLimiter, async (req, res) => {
  const parsed = sendEmailSchema.safeParse(req.body)
  if (!parsed.success) {
    // El detalle del schema Zod no se expone al cliente para no filtrar
    // la forma interna de validación; queda solo en el log del servidor
    console.warn('Validación fallida:', parsed.error.issues)
    return res.status(400).json({ ok: false, message: 'Datos inválidos' })
  }

  const data = parsed.data

  // Los destinatarios NUNCA se toman del cliente — se resuelven server-side por sucursal
  const recipients = resolveRecipients(data.sucursales)
  if (!recipients) {
    return res.status(400).json({ ok: false, message: 'Sucursal no reconocida' })
  }

  try {
    const html = buildDepositoEmailHtml(data, data.mode)
    const subject = SUBJECTS[data.mode] ?? SUBJECTS.solicitud

    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: recipients,
      subject,
      html,
    })

    if (error) {
      console.error('❌ Resend rechazó el envío:', error)
      return res.status(502).json({ ok: false, message: 'No se pudo enviar el correo' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('❌ Error inesperado enviando correo:', err)
    return res.status(500).json({ ok: false, message: 'Error interno al enviar el correo' })
  }
})

// Health check para Dokploy
app.get('/health', (_req, res) => res.status(200).json({ ok: true }))

// Sirve el build estático de Vite
app.use(express.static(DIST_DIR))

// SPA fallback: cualquier ruta no manejada devuelve index.html
// Express 5 (path-to-regexp v8) requiere wildcard nombrado, ya no acepta '*' a secas
app.get('/*splat', (_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`)
})
