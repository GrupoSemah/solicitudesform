// API client para enviar datos al CRM Tracker
const API_URL = import.meta.env.VITE_CRM_API_URL || 'http://localhost:4000/api/v1';

// Mapeo de letras de opción a texto completo (las preguntas usan valores cortos internamente)
const MOTIVO_MAP = {
  a: "Requiero ese espacio para darle otro uso",
  b: "Empezaré una remodelación en mi inmueble",
  c: "Necesito dejar el lugar donde están mis pertenencias (entrega de alquiler, venta, mudanza)",
  d: "La persona (o empresa) que tiene mis pertenencias requiere entregármelas",
}

const PROCEDENCIA_MAP = {
  a: "En mi vivienda (residencia de uso diario)",
  b: "En mi oficina, local o negocio",
  c: "En otro depósito o self storage",
  d: "Están en camino (Ejemplo: Provienen del extranjero)",
}

const TIPO_USO_MAP = {
  a: "Personales (bienes propios o familiares)",
  b: "Comerciales (bienes de un negocio o actividad económica)",
  c: "Ambos (una mezcla de personales y comerciales)",
}

const TIPO_BIENES_MAP = {
  a: "Muebles y mobiliario",
  b: "Enseres y artículos del hogar",
  c: "Documentos y archivos",
  d: "Mercancía, productos o inventario",
  e: "Equipos, herramientas o tecnología",
  f: "Artículos personales y recuerdos",
}

const MESES_MAP = {
  a: "Entre 1 y 6 meses",
  b: "Entre 7 y 12 meses",
  c: "Más de 12 meses",
}

// Mapa de campos a etiquetas en español para mostrar errores legibles al usuario
const ETIQUETAS_CAMPOS = {
  sucursales: 'Sucursal',
  razonprincipal: 'Razón principal',
  tiempodesocupar: 'Tiempo de ocupación',
  mesesContrato: 'Duración del contrato',
  tipoUso: 'Tipo de uso',
  tipoBienes: 'Tipo de bienes',
  procedenciaBienes: 'Procedencia de bienes',
  nombrenatural: 'Nombre',
  apellido: 'Apellido',
  cedula: 'Cédula/Pasaporte',
  nacimiento: 'Fecha de nacimiento',
  correo: 'Email (persona natural)',
  confirmeemail: 'Confirmar Email (persona natural)',
  compania: 'Nombre de la compañía',
  ruc: 'RUC',
  dv: 'DV',
  representante: 'Representante legal',
  cedularepresentante: 'Cédula del representante',
  correojuridico: 'Email (empresa)',
  confirmeemailjuridico: 'Confirmar Email (empresa)',
  nombre1: 'Nombre persona autorizada 1',
  email1: 'Email persona autorizada 1',
  telefono1: 'Teléfono persona autorizada 1',
  mobile1: 'Mobile persona autorizada 1',
  email2: 'Email persona autorizada 2',
  email3: 'Email persona autorizada 3',
};

export const sendToCRMTracker = async (data) => {
  const response = await fetch(`${API_URL}/solicitudes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Branch and timing info
      sucursales: data.sucursales,
      meses: MESES_MAP[data.tiempodesocupar] ?? data.tiempodesocupar,
      motivo: MOTIVO_MAP[data.razonprincipal] ?? data.razonprincipal,
      mesesContrato: data.mesesContrato,

      // Campos de tracking (resueltos a texto completo)
      tipoUso: TIPO_USO_MAP[data.tipoUso] ?? data.tipoUso,
      // Solo llega la primera opción marcada (índice 0) — SiteLink espera un único valor
      tipoBienes: TIPO_BIENES_MAP[data.tipoBienes?.[0]] ?? data.tipoBienes?.[0] ?? "",
      procedenciaBienes: PROCEDENCIA_MAP[data.procedenciaBienes] ?? data.procedenciaBienes,

      // Tipo de persona (viene del estado React, no del form)
      persona: data.persona,

      // Persona Natural — undefined si persona es jurídica (shouldUnregister: true lo limpia)
      nombrenatural: data.nombrenatural,
      apellido: data.apellido,
      cedula: data.cedula,
      nacimiento: data.nacimiento,
      direccion: data.direccion,
      telefonoResidencial: data.telefonoResidencial,
      mobile: data.mobile,
      telefonoOficina: data.telefonoOficina,
      correo: data.correo || '',
      confirmeemail: data.confirmeemail || '',

      // Persona Jurídica — undefined si persona es natural (shouldUnregister: true lo limpia)
      compania: data.compania,
      ruc: data.ruc,
      dv: data.dv,
      representante: data.representante,
      cedularepresentante: data.cedularepresentante,
      percontacto: data.percontacto,
      cedulacontacto: data.cedulacontacto,
      telefonocontacto: data.telefonocontacto,
      telefonotrabajo: data.telefonotrabajo,
      telefonotrabajo2: data.telefonotrabajo2,
      mobilejuridico: data.mobilejuridico,
      correojuridico: data.correojuridico || '',
      confirmeemailjuridico: data.confirmeemailjuridico || '',

      // Personas autorizadas
      nombre1: data.nombre1,
      telefono1: data.telefono1,
      mobile1: data.mobile1,
      email1: data.email1,
      nombre2: data.nombre2,
      telefono2: data.telefono2,
      mobile2: data.mobile2,
      email2: data.email2,
      nombre3: data.nombre3,
      telefono3: data.telefono3,
      mobile3: data.mobile3,
      email3: data.email3,

      // Archivos
      file1: data.file1,
      file2: data.file2,
      emails: data.emails,

      // Proceso judicial
      nombredemandante: data.nombredemandante,
      direcciondemandante: data.direcciondemandante,
      telefonodemandante: data.telefonodemandante,
      proceso: data.judicial,
    }),
  });

  if (!response.ok) {
    let mensaje = `Error del servidor (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData?.message) mensaje = errorData.message;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        // Construir mensaje detallado con los nombres de campos en español
        const detalles = errorData.errors.map((err) => {
          const campo = err.path?.[0] || 'campo desconocido';
          const etiqueta = ETIQUETAS_CAMPOS[campo] || campo;
          const motivo = err.message || 'valor inválido';
          return `\u2022 ${etiqueta}: ${motivo}`;
        });
        mensaje = `Los siguientes campos tienen errores:\n${detalles.join('\n')}`;
      }
    } catch {
      // respuesta sin JSON
    }
    throw new Error(mensaje);
  }

  const result = await response.json();
  console.log('✅ Datos enviados al CRM Tracker:', result);
  return result;
};
