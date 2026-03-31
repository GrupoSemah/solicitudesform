// API client para enviar datos al CRM Tracker
const API_URL = import.meta.env.VITE_CRM_API_URL || 'http://localhost:4000/api/v1';

// Mapa de campos a etiquetas en español para mostrar errores legibles al usuario
const ETIQUETAS_CAMPOS = {
  sucursales: 'Sucursal',
  razonprincipal: 'Razón principal',
  tiempodesocupar: 'Tiempo de ocupación',
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
      meses: data.tiempodesocupar,
      motivo: data.razonprincipal,

      // Nuevos campos de tracking
      tipoUso: data.tipoUso,
      tipoBienes: data.tipoBienes,
      procedenciaBienes: data.procedenciaBienes,

      // Person type
      persona: data.persona,

      // Persona Natural (solo se envía si persona === 'natural')
      nombrenatural: data.persona === 'natural' ? data.nombrenatural : undefined,
      apellido: data.persona === 'natural' ? data.apellido : undefined,
      cedula: data.persona === 'natural' ? data.cedula : undefined,
      nacimiento: data.persona === 'natural' ? data.nacimiento : undefined,
      direccion: data.persona === 'natural' ? data.direccion : undefined,
      telefonoResidencial: data.persona === 'natural' ? data.telefonoResidencial : undefined,
      mobile: data.persona === 'natural' ? data.mobile : undefined,
      telefonoOficina: data.persona === 'natural' ? data.telefonoOficina : undefined,
      correo: data.persona === 'natural' ? data.correo : '',
      confirmeemail: data.persona === 'natural' ? data.confirmeemail : '',

      // Persona Jurídica (solo se envía si persona === 'juridica')
      compania: data.persona === 'juridica' ? data.compania : undefined,
      ruc: data.persona === 'juridica' ? data.ruc : undefined,
      dv: data.persona === 'juridica' ? data.dv : undefined,
      representante: data.persona === 'juridica' ? data.representante : undefined,
      cedularepresentante: data.persona === 'juridica' ? data.cedularepresentante : undefined,
      percontacto: data.persona === 'juridica' ? data.percontacto : undefined,
      cedulacontacto: data.persona === 'juridica' ? data.cedulacontacto : undefined,
      telefonocontacto: data.persona === 'juridica' ? data.telefonocontacto : undefined,
      telefonotrabajo: data.persona === 'juridica' ? data.telefonotrabajo : undefined,
      telefonotrabajo2: data.persona === 'juridica' ? data.telefonotrabajo2 : undefined,
      mobilejuridico: data.persona === 'juridica' ? data.mobilejuridico : undefined,
      correojuridico: data.persona === 'juridica' ? data.correojuridico : '',
      confirmeemailjuridico: data.persona === 'juridica' ? data.confirmeemailjuridico : '',

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
