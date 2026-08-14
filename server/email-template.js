// Mapeo de letras de opción a texto completo — espejo de src/global/email.jsx y src/global/api.jsx
const MOTIVO_MAP = {
  a: 'Requiero ese espacio para darle otro uso',
  b: 'Empezaré una remodelación en mi inmueble',
  c: 'Necesito dejar el lugar donde están mis pertenencias (entrega de alquiler, venta, mudanza)',
  d: 'La persona (o empresa) que tiene mis pertenencias requiere entregármelas',
}

const PROCEDENCIA_MAP = {
  a: 'En mi vivienda (residencia de uso diario)',
  b: 'En mi oficina, local o negocio',
  c: 'En otro depósito o self storage',
  d: 'Están en camino (Ejemplo: Provienen del extranjero)',
}

const TIPO_USO_MAP = {
  a: 'Personales (bienes propios o familiares)',
  b: 'Comerciales (bienes de un negocio o actividad económica)',
  c: 'Ambos (una mezcla de personales y comerciales)',
}

const TIPO_BIENES_MAP = {
  a: 'Muebles y mobiliario',
  b: 'Enseres y artículos del hogar',
  c: 'Documentos y archivos',
  d: 'Mercancía, productos o inventario',
  e: 'Equipos, herramientas o tecnología',
  f: 'Artículos personales y recuerdos',
}

const MESES_MAP = {
  a: 'Entre 1 y 6 meses',
  b: 'Entre 7 y 12 meses',
  c: 'Más de 12 meses',
}

// Escapa entidades HTML para evitar inyección/XSS al interpolar datos de usuario en el correo
function escapeHtml(value) {
  if (value === null || value === undefined) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Solo permite interpolar como href URLs http(s) válidas — evita javascript: y otros esquemas peligrosos
function safeHref(value) {
  if (!value) return '#'
  try {
    const url = new URL(String(value))
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.toString()
  } catch {
    // valor no es una URL válida
  }
  return '#'
}

const TITLES = {
  solicitud: '📋 Nueva Solicitud de Depósito',
  actualizacion: '📋 Nueva Actualización de Depósito',
}

/**
 * Arma el HTML del correo de notificación de depósito.
 * Conversión fiel del template original de EmailJS a interpolación server-side.
 */
export function buildDepositoEmailHtml(data, mode) {
  const title = TITLES[mode] ?? TITLES.solicitud
  // from_name: EmailJS no lo recibía como parámetro (dependía de config del dashboard).
  // Aquí se usa la sucursal, que es el dato más representativo del "origen" del formulario.
  const fromName = escapeHtml(data.sucursales)

  const razonprincipal = escapeHtml(MOTIVO_MAP[data.razonprincipal] ?? data.razonprincipal)
  const tiempodesocupar = escapeHtml(MESES_MAP[data.tiempodesocupar] ?? data.tiempodesocupar)
  const tipoUso = escapeHtml(TIPO_USO_MAP[data.tipoUso] ?? data.tipoUso)
  // Solo llega la primera opción marcada (índice 0) — SiteLink espera un único valor
  const primerTipoBienes = Array.isArray(data.tipoBienes) ? data.tipoBienes[0] : data.tipoBienes
  const tipoBienes = escapeHtml(TIPO_BIENES_MAP[primerTipoBienes] ?? primerTipoBienes ?? '')
  const procedenciaBienes = escapeHtml(PROCEDENCIA_MAP[data.procedenciaBienes] ?? data.procedenciaBienes)

  const file1Href = safeHref(data.file1)
  const file2Href = safeHref(data.file2)

  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;background-color:#f4f4f4;margin:0;padding:0}
.container{max-width:700px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
.header{background:linear-gradient(135deg,#ea580c 0%,#f97316 100%);color:#fff;padding:30px;text-align:center}
.header h1{margin:0;font-size:24px;font-weight:600}.header p{margin:10px 0 0 0;font-size:14px;opacity:.95}
.content{padding:30px}.section{margin-bottom:30px;border-left:4px solid #ea580c;background:#fef3f2;padding:20px;border-radius:4px}
.section-title{color:#ea580c;font-size:18px;font-weight:700;margin:0 0 15px 0}
.subsection{background:#fff;padding:15px;border-radius:4px;margin-top:15px;border:1px solid #fed7aa}
.subsection-title{color:#9a3412;font-size:14px;font-weight:600;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:.5px}
.field-group{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:10px}.field{margin-bottom:8px}
.field-label{color:#78716c;font-size:12px;font-weight:600;text-transform:uppercase;margin-bottom:3px}
.field-value{color:#1c1917;font-size:14px;font-weight:500}
.badge{display:inline-block;padding:4px 12px;background:#ea580c;color:#fff;border-radius:12px;font-size:12px;font-weight:600;margin-bottom:10px}
.file-link{display:inline-block;padding:10px 20px;background:#ea580c;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;margin:5px 5px 5px 0}
.footer{background:#292524;color:#fff;padding:20px 30px;text-align:center;font-size:14px}.footer p{margin:5px 0}
.divider{height:1px;background:#e7e5e4;margin:20px 0}
@media only screen and (max-width:600px){.field-group{grid-template-columns:1fr}}
</style></head><body><div class="container">
<div class="header"><h1>${title}</h1><p>Formulario recibido desde: <strong>${fromName}</strong></p></div>
<div class="content">
<div class="section"><h2 class="section-title">Información de la Bodega</h2>
<div class="field"><div class="field-label">Sucursal</div><div class="field-value">${escapeHtml(data.sucursales)}</div></div>
<div class="field-group"><div class="field"><div class="field-label">Razón principal</div><div class="field-value">${razonprincipal}</div></div>
<div class="field"><div class="field-label">Tiempo de desocupación</div><div class="field-value">${tiempodesocupar}</div></div></div></div>
<div class="section"><h2 class="section-title">Detalles del Almacenamiento</h2>
<div class="field"><div class="field-label">Tipo de uso</div><div class="field-value">${tipoUso}</div></div>
<div class="field"><div class="field-label">Tipo de bienes a almacenar</div><div class="field-value">${tipoBienes}</div></div>
<div class="field"><div class="field-label">Procedencia de los bienes</div><div class="field-value">${procedenciaBienes}</div></div></div>
<div class="section"><h2 class="section-title">Datos del Cliente</h2><div class="badge">${escapeHtml(data.persona)}</div>
<div class="subsection"><div class="subsection-title">📄 Persona Natural</div>
<div class="field-group"><div class="field"><div class="field-label">Nombre completo</div><div class="field-value">${escapeHtml(data.nombrenatural)} ${escapeHtml(data.apellido)}</div></div>
<div class="field"><div class="field-label">Cédula/Pasaporte</div><div class="field-value">${escapeHtml(data.cedula)}</div></div></div>
<div class="field-group"><div class="field"><div class="field-label">Fecha de nacimiento</div><div class="field-value">${escapeHtml(data.nacimiento)}</div></div>
<div class="field"><div class="field-label">Email</div><div class="field-value">${escapeHtml(data.correo)}</div></div></div>
<div class="field"><div class="field-label">Dirección</div><div class="field-value">${escapeHtml(data.direccion)}</div></div>
<div class="field-group"><div class="field"><div class="field-label">Tel. Residencial</div><div class="field-value">${escapeHtml(data.telefonoResidencial)}</div></div>
<div class="field"><div class="field-label">Mobile</div><div class="field-value">${escapeHtml(data.mobile)}</div></div>
<div class="field"><div class="field-label">Tel. Oficina</div><div class="field-value">${escapeHtml(data.telefonoOficina)}</div></div></div></div>
<div class="subsection"><div class="subsection-title">🏢 Persona Jurídica</div>
<div class="field-group"><div class="field"><div class="field-label">Nombre de la compañía</div><div class="field-value">${escapeHtml(data.compania)}</div></div>
<div class="field"><div class="field-label">RUC - DV</div><div class="field-value">${escapeHtml(data.ruc)} - ${escapeHtml(data.dv)}</div></div></div>
<div class="field-group"><div class="field"><div class="field-label">Representante legal</div><div class="field-value">${escapeHtml(data.representante)}</div></div>
<div class="field"><div class="field-label">Cédula representante</div><div class="field-value">${escapeHtml(data.cedularepresentante)}</div></div></div>
<div class="field-group"><div class="field"><div class="field-label">Persona de contacto</div><div class="field-value">${escapeHtml(data.percontacto)}</div></div>
<div class="field"><div class="field-label">Cédula contacto</div><div class="field-value">${escapeHtml(data.cedulacontacto)}</div></div></div>
<div class="field-group"><div class="field"><div class="field-label">Tel. Oficina</div><div class="field-value">${escapeHtml(data.telefonocontacto)}</div></div>
<div class="field"><div class="field-label">Tel. Trabajo</div><div class="field-value">${escapeHtml(data.telefonotrabajo)}</div></div>
<div class="field"><div class="field-label">Tel. Oficina 2</div><div class="field-value">${escapeHtml(data.telefonotrabajo2)}</div></div>
<div class="field"><div class="field-label">Mobile</div><div class="field-value">${escapeHtml(data.mobilejuridico)}</div></div></div>
<div class="field"><div class="field-label">Email</div><div class="field-value">${escapeHtml(data.correojuridico)}</div></div></div></div>
<div class="section"><h2 class="section-title">Personas Autorizadas para Ingresar</h2>
<div class="subsection"><div class="subsection-title">👤 Persona Autorizada 1</div><div class="field-group">
<div class="field"><div class="field-label">Nombre</div><div class="field-value">${escapeHtml(data.nombre1)}</div></div>
<div class="field"><div class="field-label">Teléfono</div><div class="field-value">${escapeHtml(data.telefono1)}</div></div>
<div class="field"><div class="field-label">Mobile</div><div class="field-value">${escapeHtml(data.mobile1)}</div></div>
<div class="field"><div class="field-label">Email</div><div class="field-value">${escapeHtml(data.email1)}</div></div></div></div>
<div class="subsection"><div class="subsection-title">👤 Persona Autorizada 2</div><div class="field-group">
<div class="field"><div class="field-label">Nombre</div><div class="field-value">${escapeHtml(data.nombre2)}</div></div>
<div class="field"><div class="field-label">Teléfono</div><div class="field-value">${escapeHtml(data.telefono2)}</div></div>
<div class="field"><div class="field-label">Mobile</div><div class="field-value">${escapeHtml(data.mobile2)}</div></div>
<div class="field"><div class="field-label">Email</div><div class="field-value">${escapeHtml(data.email2)}</div></div></div></div>
<div class="subsection"><div class="subsection-title">👤 Persona Autorizada 3</div><div class="field-group">
<div class="field"><div class="field-label">Nombre</div><div class="field-value">${escapeHtml(data.nombre3)}</div></div>
<div class="field"><div class="field-label">Teléfono</div><div class="field-value">${escapeHtml(data.telefono3)}</div></div>
<div class="field"><div class="field-label">Mobile</div><div class="field-value">${escapeHtml(data.mobile3)}</div></div>
<div class="field"><div class="field-label">Email</div><div class="field-value">${escapeHtml(data.email3)}</div></div></div></div></div>
<div class="section"><h2 class="section-title">⚖️ Proceso Judicial</h2>
<div class="field"><div class="field-label">¿Tiene proceso judicial?</div><div class="field-value"><strong>${escapeHtml(data.proceso)}</strong></div></div>
<div class="divider"></div><div class="field-group">
<div class="field"><div class="field-label">Nombre del demandante</div><div class="field-value">${escapeHtml(data.nombredemandante)}</div></div>
<div class="field"><div class="field-label">Teléfono</div><div class="field-value">${escapeHtml(data.telefonodemandante)}</div></div></div>
<div class="field"><div class="field-label">Dirección del demandante</div><div class="field-value">${escapeHtml(data.direcciondemandante)}</div></div></div>
<div class="section"><h2 class="section-title">📎 Archivos Adjuntos</h2><div style="margin-top:15px">
<a href="${file1Href}" class="file-link">📄 Ver Cédula/Pasaporte</a>
<a href="${file2Href}" class="file-link">📄 Ver Aviso de Operaciones</a></div></div>
</div>
<div class="footer"><p><strong>Almacenajes S.A.</strong></p><p>Sistema de Solicitudes de Depósito</p>
<p style="font-size:12px;opacity:.8;margin-top:10px">Este es un correo automático, por favor no responder.</p></div>
</div></body></html>`
}
