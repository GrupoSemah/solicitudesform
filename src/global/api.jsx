// API client para enviar datos al CRM Tracker
const API_URL = import.meta.env.VITE_CRM_API_URL || 'http://localhost:4000/api/v1';

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
      meses: data.tiempodesocupar,
      motivo: data.razonprincipal,
      mesesContrato: data.mesesContrato,

      // Nuevos campos de tracking
      tipoUso: data.tipoUso,
      tipoBienes: data.tipoBienes,
      procedenciaBienes: data.procedenciaBienes,

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
