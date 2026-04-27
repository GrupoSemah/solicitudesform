export const BrandsInfo = ({ register, errors, setValue }) => {
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
    const emailsText = emails.join(", ")

    setValue("emails", emailsText)
  }

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Informacion de la Sucursal</p>
      <div className="h-px bg-orange-100 mb-4" />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="razonprincipal" className="block text-xs font-medium text-gray-600 mb-1">
            ¿Cuál es la razón principal por la que necesita el depósito?
            <span className="text-red-500 font-semibold">*</span>
          </label>
          <select
            id="razonprincipal"
            {...register("razonprincipal", { required: true })}
            className={`w-full h-11 px-3 rounded-lg border ${errors.razonprincipal ? "border-red-400" : "border-gray-200"} text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200`}
          >
            <option value="">Seleccione:</option>
            <option value="Guardar temporalmente (Por remodelación del inmueble o en espera de entrega de inmueble)">Guardar temporalmente (Por remodelación del inmueble o en espera de entrega de inmueble)</option>
            <option value="Guardar temporalmente hasta vender, regalar o eliminar">Guardar temporalmente hasta vender, regalar o eliminar</option>
            <option value="Guardar por tiempo indefinido">Guardar por tiempo indefinido</option>
          </select>
          {errors.razonprincipal && <p className="text-red-500 text-xs mt-1">Por favor seleccione una razón</p>}
        </div>

        <div>
          <label htmlFor="tiempodesocupar" className="block text-xs font-medium text-gray-600 mb-1">
            ¿Cuánto tiempo planea ocupar la bodega?
            <span className="text-red-500 font-semibold">*</span>
          </label>
          <select
            id="tiempodesocupar"
            {...register("tiempodesocupar", { required: true })}
            className={`w-full h-11 px-3 rounded-lg border ${errors.tiempodesocupar ? "border-red-400" : "border-gray-200"} text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200`}
          >
            <option value="">Seleccione:</option>
            <option value="Entre 1 y 6 meses">Entre 1 y 6 meses</option>
            <option value="Entre 7 y 12 meses">Entre 7 y 12 meses</option>
            <option value="En más de 12 meses">En más de 12 meses</option>
          </select>
          {errors.tiempodesocupar && <p className="text-red-500 text-xs mt-1">Por favor seleccione un tiempo estimado</p>}
        </div>
      </div>
    </section>
  )
}

