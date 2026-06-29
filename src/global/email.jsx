import emailjs from "@emailjs/browser";

// Mapeo de letras de opción a texto completo para EmailJS
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

export const sendCustomEmail = (data, judicial) => {
    emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
    return emailjs
        .send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            {
                sucursales: data.sucursales,
                razonprincipal: MOTIVO_MAP[data.razonprincipal] ?? data.razonprincipal,
                tiempodesocupar: MESES_MAP[data.tiempodesocupar] ?? data.tiempodesocupar,
                mesesContrato: data.mesesContrato,
                persona: data.persona,
                nombrenatural: data.nombrenatural,
                apellido: data.apellido,
                cedula: data.cedula,
                nacimiento: data.nacimiento,
                direccion: data.direccion,
                telefonoResidencial: data.telefonoResidencial,
                mobile: data.mobile,
                telefonoOficina: data.telefonoOficina,
                correo: data.correo,
                confirmeemail: data.confirmeemail,
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
                correojuridico: data.correojuridico,
                confirmeemailjuridico: data.confirmeemailjuridico,
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
                tipoUso: TIPO_USO_MAP[data.tipoUso] ?? data.tipoUso,
                // Solo llega la primera opción marcada (índice 0) — SiteLink espera un único valor
                tipoBienes: TIPO_BIENES_MAP[data.tipoBienes?.[0]] ?? data.tipoBienes?.[0] ?? "",
                procedenciaBienes: PROCEDENCIA_MAP[data.procedenciaBienes] ?? data.procedenciaBienes,
                nombredemandante: data.nombredemandante,
                direcciondemandante: data.direcciondemandante,
                telefonodemandante: data.telefonodemandante,
                file1: data.file1,
                file2: data.file2,
                emails: data.emails,
                proceso: judicial,
            }
        )
        .then(response => {
            console.log("✅ EmailJS enviado:", response.status, response.text);
        });
};