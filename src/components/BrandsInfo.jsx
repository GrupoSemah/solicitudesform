// Componente de información de sucursal y preguntas de encuesta P1, P5, P6
export const BrandsInfo = ({ register, errors, setValue, disabledP6 = [] }) => {
  const handleSelectChange = (event) => {
    const selectedSucursal = event.target.value
    const sucursalEmails = {
      "Milla 8": [
        "milla8@almacenajes.net",
        "ventas.milla8@almacenajes.net",
        "callcenter2@almacenajes.net",
        "callcenter3@almacenajes.net",
      ],
      "Vista Hermosa": [
        "vistahermosa@almacenajes.net",
        "ventas.vistahermosa@almacenajes.net",
        "callcenter2@almacenajes.net",
        "callcenter3@almacenajes.net",
      ],
      "Costa del Este": [
        "costadeleste@almacenajes.net",
        "ventas.costadeleste@almacenajes.net",
        "callcenter2@almacenajes.net",
        "callcenter3@almacenajes.net",
      ],
      "Rio Abajo": [
        "rioabajo@almacenajes.net",
        "ventas.rioabajo@almacenajes.net",
        "callcenter2@almacenajes.net",
        "callcenter3@almacenajes.net",
      ],
      "Albrook": [
        "albrook@almacenajes.net",
        "ventas.albrook@almacenajes.net",
        "callcenter2@almacenajes.net",
        "callcenter3@almacenajes.net",
      ],
      "San Antonio": [
        "sanantonio@almacenajes.net",
        "ventas.sanantonio@almacenajes.net",
        "callcenter2@almacenajes.net",
        "callcenter3@almacenajes.net",
      ],
      "Colón": ["colon@almacenajes.net", "callcenter2@almacenajes.net", "callcenter3@almacenajes.net"],
      "Gorgona": ["gorgona@almacenajes.net", "callcenter2@almacenajes.net", "callcenter3@almacenajes.net"],
      "David": ["david@almacenajes.net", "callcenter2@almacenajes.net", "callcenter3@almacenajes.net"],
      "Hato Montaña": ["hatomontana@almacenajes.net", "callcenter2@almacenajes.net", "callcenter3@almacenajes.net"],
      "Tumba Muerto": ["ventas.tumbamuerto@almacenajes.net", "callcenter2@almacenajes.net", "callcenter3@almacenajes.net"],
    }
    const emails = sucursalEmails[selectedSucursal] || []
    setValue("emails", emails.join(", "))
  }

  // Opciones de P6 con sus valores de payload
  const opcionesContrato = [
    { value: "1 mes",    label: "1 mes" },
    { value: "3 meses",  label: "3 meses" },
    { value: "6 meses",  label: "6 meses" },
    { value: "12 meses", label: "12 meses" },
  ]

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Informacion de la Sucursal</p>
      <div className="h-px bg-orange-100 mb-4" />

      {/* Selección de sucursal */}
      <div className="mb-5">
        <label htmlFor="sucursales" className="block text-xs font-medium text-gray-600 mb-1">
          Sucursal<span className="text-red-500 font-semibold">*</span>
        </label>
        <select
          id="sucursales"
          {...register("sucursales", { required: true })}
          onChange={handleSelectChange}
          className={`w-full h-11 px-3 rounded-lg border ${errors.sucursales ? "border-red-400" : "border-gray-200"} text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200`}
        >
          <option value="">Seleccione:</option>
          <option value="Milla 8">Milla 8</option>
          <option value="Vista Hermosa">Vista Hermosa</option>
          <option value="Costa del Este">Costa del Este</option>
          <option value="Rio Abajo">Rio Abajo</option>
          <option value="Albrook">Albrook</option>
          <option value="San Antonio">San Antonio</option>
          <option value="Colón">Colón</option>
          <option value="Gorgona">Gorgona</option>
          <option value="David">David</option>
          <option value="Hato Montaña">Hato Montaña</option>
          <option value="Tumba Muerto">Tumba Muerto</option>
        </select>
        {errors.sucursales && <p className="text-red-500 text-xs mt-1">Por favor seleccione una sucursal</p>}
      </div>

      {/* P1: Razón principal — payload: motivo / emailjs: razonprincipal */}
      <div className="mb-5">
        <label htmlFor="razonprincipal" className="block text-xs font-medium text-gray-600 mb-1">
          ¿Por qué necesita trasladar sus pertenencias a un depósito?
          <span className="text-red-500 font-semibold">*</span>
        </label>
        <select
          id="razonprincipal"
          {...register("razonprincipal", { required: true })}
          className={`w-full h-11 px-3 rounded-lg border ${errors.razonprincipal ? "border-red-400" : "border-gray-200"} text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200`}
        >
          <option value="">Seleccione:</option>
          <option value="a">Requiero ese espacio para darle otro uso</option>
          <option value="b">Empezaré una remodelación en mi inmueble</option>
          <option value="c">Necesito dejar el lugar donde están mis pertenencias (entrega de alquiler, venta, mudanza)</option>
          <option value="d">La persona (o empresa) que tiene mis pertenencias requiere entregármelas</option>
        </select>
        {errors.razonprincipal && <p className="text-red-500 text-xs mt-1">Por favor seleccione una razón</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* P5: Tiempo de ocupación — payload: meses / emailjs: tiempodesocupar */}
        <div>
          <label htmlFor="tiempodesocupar" className="block text-xs font-medium text-gray-600 mb-1">
            ¿Cuánto tiempo visualiza ocupar la bodega?
            <span className="text-red-500 font-semibold">*</span>
          </label>
          <select
            id="tiempodesocupar"
            {...register("tiempodesocupar", { required: true })}
            className={`w-full h-11 px-3 rounded-lg border ${errors.tiempodesocupar ? "border-red-400" : "border-gray-200"} text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200`}
          >
            <option value="">Seleccione:</option>
            <option value="a">Entre 1 y 6 meses</option>
            <option value="b">Entre 7 y 12 meses</option>
            <option value="c">Más de 12 meses</option>
          </select>
          {errors.tiempodesocupar && <p className="text-red-500 text-xs mt-1">Por favor seleccione un tiempo estimado</p>}
        </div>

        {/* P6: Meses de contrato — payload: mesesContrato / emailjs: mesesContrato */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            ¿Por cuántos meses desea firmar el contrato inicial?{" "}
            <span className="text-gray-400 font-normal">(se renueva automáticamente si desea permanecer más tiempo)</span>
            <span className="text-red-500 font-semibold">*</span>
          </label>
          <select
            id="mesesContrato"
            {...register("mesesContrato", { required: true })}
            className={`w-full h-11 px-3 rounded-lg border ${errors.mesesContrato ? "border-red-400" : "border-gray-200"} text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200`}
          >
            <option value="">Seleccione:</option>
            {opcionesContrato.map(({ value, label }) => (
              <option key={value} value={value} disabled={disabledP6.includes(value)}>
                {label}{disabledP6.includes(value) ? " (no disponible)" : ""}
              </option>
            ))}
          </select>
          {errors.mesesContrato && <p className="text-red-500 text-xs mt-1">Por favor seleccione la duración del contrato</p>}
        </div>
      </div>
    </section>
  )
}
