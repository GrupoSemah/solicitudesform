// Mapeo sucursal -> destinatarios del correo de notificación.
// Fuente de verdad server-side: el cliente NUNCA decide a quién se envía el correo.
// Espejo de src/components/BrandsInfo.jsx (mismo mapeo, mantener sincronizados).
export const SUCURSAL_EMAILS = {
  'Milla 8': [
    'milla8@almacenajes.net',
    'ventas.milla8@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
  'Vista Hermosa': [
    'vistahermosa@almacenajes.net',
    'ventas.vistahermosa@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
  'Costa del Este': [
    'costadeleste@almacenajes.net',
    'ventas.costadeleste@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
  'Rio Abajo': [
    'rioabajo@almacenajes.net',
    'ventas.rioabajo@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
  Albrook: [
    'albrook@almacenajes.net',
    'ventas.albrook@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
  'San Antonio': [
    'sanantonio@almacenajes.net',
    'ventas.sanantonio@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
  Colón: ['colon@almacenajes.net', 'callcenter2@almacenajes.net', 'callcenter3@almacenajes.net'],
  Gorgona: ['gorgona@almacenajes.net', 'callcenter2@almacenajes.net', 'callcenter3@almacenajes.net'],
  David: ['david@almacenajes.net', 'callcenter2@almacenajes.net', 'callcenter3@almacenajes.net'],
  'Hato Montaña': ['hatomontana@almacenajes.net', 'callcenter2@almacenajes.net', 'callcenter3@almacenajes.net'],
  'Tumba Muerto': [
    'ventas.tumbamuerto@almacenajes.net',
    'callcenter2@almacenajes.net',
    'callcenter3@almacenajes.net',
  ],
}

/**
 * Resuelve los destinatarios del correo a partir del nombre de la sucursal.
 * Devuelve null si la sucursal no matchea el mapeo (el caller debe responder 400).
 */
export function resolveRecipients(sucursal) {
  const emails = SUCURSAL_EMAILS[sucursal]
  if (!emails || emails.length === 0) return null
  return emails
}
