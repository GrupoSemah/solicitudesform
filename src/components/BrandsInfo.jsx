export const BrandsInfo = ({ register, setValue }) => {
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
      <div className="mb-4">
        <label htmlFor="sucursales" className="block mb-2">
          Sucursal<span className="text-red-500">*</span>:
        </label>
        <select
          id="sucursales"
          {...register("sucursales", { required: true })}
          onChange={handleSelectChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="mb-4">
          <label htmlFor="razonprincipal" className="block mb-2">
            ¿Cuál es la razón principal por la que necesita el depósito?
            <span className="text-red-500">*</span>:
          </label>
          <select
            id="razonprincipal"
            {...register("razonprincipal", { required: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Seleccione:</option>
            <option value="Guardar temporalmente (Por remodelación del inmueble o en espera de entrega de inmueble)">Guardar temporalmente (Por remodelación del inmueble o en espera de entrega de inmueble)</option>
            <option value="Guardar temporalmente hasta vender, regalar o eliminar">Guardar temporalmente hasta vender, regalar o eliminar</option>
            <option value="Guardar por tiempo indefinido">Guardar por tiempo indefinido</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="tiempodesocupar" className="block mb-2">
            ¿Cuánto tiempo planea ocupar la bodega?
            <span className="text-red-500">*</span>:
          </label>
          <select
            id="tiempodesocupar"
            {...register("tiempodesocupar", { required: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Seleccione:</option>
            <option value="Entre 1 y 6 meses">Entre 1 y 6 meses</option>
            <option value="Entre 7 y 12 meses">Entre 7 y 12 meses</option>
            <option value="En más de 12 meses">En más de 12 meses</option>
          </select>
        </div>
      </div>
    </section>
  )
}

