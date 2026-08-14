import { z } from 'zod'

// Texto opcional con cap de longitud (evita payloads abusivos en campos libres)
const optionalText = (max = 300) => z.string().max(max).optional().or(z.literal(''))

export const sendEmailSchema = z
  .object({
    mode: z.enum(['solicitud', 'actualizacion']).default('solicitud'),

    // Bodega / encuesta
    sucursales: z.string().min(1, 'Sucursal requerida').max(100),
    razonprincipal: optionalText(),
    tiempodesocupar: optionalText(),
    mesesContrato: optionalText(50),
    tipoUso: optionalText(),
    tipoBienes: z.array(z.string().max(50)).max(10).optional(),
    procedenciaBienes: optionalText(),

    // Tipo de persona
    persona: optionalText(50),

    // Persona natural
    nombrenatural: optionalText(),
    apellido: optionalText(),
    cedula: optionalText(100),
    nacimiento: optionalText(50),
    direccion: optionalText(500),
    telefonoResidencial: optionalText(50),
    mobile: optionalText(50),
    telefonoOficina: optionalText(50),
    correo: z.string().email().max(200).optional().or(z.literal('')),
    confirmeemail: optionalText(200),

    // Persona jurídica
    compania: optionalText(),
    ruc: optionalText(100),
    dv: optionalText(20),
    representante: optionalText(),
    cedularepresentante: optionalText(100),
    percontacto: optionalText(),
    cedulacontacto: optionalText(100),
    telefonocontacto: optionalText(50),
    telefonotrabajo: optionalText(50),
    telefonotrabajo2: optionalText(50),
    mobilejuridico: optionalText(50),
    correojuridico: z.string().email().max(200).optional().or(z.literal('')),
    confirmeemailjuridico: optionalText(200),

    // Personas autorizadas
    nombre1: optionalText(),
    telefono1: optionalText(50),
    mobile1: optionalText(50),
    email1: z.string().email().max(200).optional().or(z.literal('')),
    nombre2: optionalText(),
    telefono2: optionalText(50),
    mobile2: optionalText(50),
    email2: z.string().email().max(200).optional().or(z.literal('')),
    nombre3: optionalText(),
    telefono3: optionalText(50),
    mobile3: optionalText(50),
    email3: z.string().email().max(200).optional().or(z.literal('')),

    // Archivos (URLs de Firebase Storage, resueltas client-side antes del submit)
    file1: optionalText(2000),
    file2: optionalText(2000),

    // Proceso judicial
    proceso: optionalText(20),
    nombredemandante: optionalText(),
    direcciondemandante: optionalText(500),
    telefonodemandante: optionalText(50),

    // Campos ignorados a propósito: `emails` y `from_name` NUNCA se toman del cliente.
    // El servidor resuelve destinatarios por sucursal (ver sucursal-emails.js).
    emails: z.string().max(2000).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.correo && !data.correojuridico) {
      ctx.addIssue({
        code: 'custom',
        message: 'Debe indicar al menos un correo (persona natural o jurídica)',
        path: ['correo'],
      })
    }
  })
