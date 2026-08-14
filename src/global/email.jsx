// Envía el correo de notificación via el mini-servidor Express (Resend).
// Los valores de las preguntas (P1, P3, P4, P5) viajan como códigos crudos ('a', 'b', ...);
// el servidor los resuelve a texto completo al armar el HTML (ver server/email-template.js).
// El modo ('solicitud' | 'actualizacion') viene de la env var de build de cada deploy.
export const sendCustomEmail = async (data, judicial) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: import.meta.env.VITE_FLOW_MODE || "solicitud",
      sucursales: data.sucursales,
      razonprincipal: data.razonprincipal,
      tiempodesocupar: data.tiempodesocupar,
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
      tipoUso: data.tipoUso,
      // Array completo tal como lo produce el form — el servidor toma el índice 0
      tipoBienes: data.tipoBienes,
      procedenciaBienes: data.procedenciaBienes,
      nombredemandante: data.nombredemandante,
      direcciondemandante: data.direcciondemandante,
      telefonodemandante: data.telefonodemandante,
      file1: data.file1,
      file2: data.file2,
      proceso: judicial,
    }),
  })

  if (!response.ok) {
    let mensaje = `Error del servidor (${response.status})`
    try {
      const errorData = await response.json()
      if (errorData?.message) mensaje = errorData.message
    } catch {
      // respuesta sin JSON
    }
    throw new Error(mensaje)
  }

  const result = await response.json()
  console.log("✅ Correo enviado:", result)
  return result
}
