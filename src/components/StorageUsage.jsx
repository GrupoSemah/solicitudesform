// Componente de uso del depósito — preguntas P2, P3, P4
// disabledP2: array de valores de opción deshabilitados en P2 (según P1)
// disabledP4: array de valores de opción deshabilitados en P4 (según P3)
// tipoBienesOrden: array con el orden de selección del usuario para P4
// onTipoBienesChange: callback que recibe el nuevo array ordenado al marcar/desmarcar
export const StorageUsage = ({ register, errors, disabledP2 = [], disabledP4 = [], tipoBienesOrden = [], onTipoBienesChange }) => {
  // Opciones de P2 — payload: procedenciaBienes
  const opcionesP2 = [
    { id: "procedenciaVivienda", value: "a", label: "En mi vivienda (residencia de uso diario)" },
    { id: "procedenciaOficina",  value: "b", label: "En mi oficina, local o negocio" },
    { id: "procedenciaDeposito", value: "c", label: "En otro depósito o self storage" },
    { id: "procedenciaCamino",   value: "d", label: "Están en camino (Ejemplo: Provienen del extranjero)" },
  ]

  // Opciones de P3 — payload: tipoUso
  const opcionesP3 = [
    { id: "tipoUsoPersonal",   value: "a", label: "Personales (bienes propios o familiares)" },
    { id: "tipoUsoComercial",  value: "b", label: "Comerciales (bienes de un negocio o actividad económica)" },
    { id: "tipoUsoAmbos",      value: "c", label: "Ambos (una mezcla de personales y comerciales)" },
  ]

  // Opciones de P4 — payload: tipoBienes
  const opcionesP4 = [
    { id: "tipoBienesMuebles",    value: "a", label: "Muebles y mobiliario" },
    { id: "tipoBienesEnseres",    value: "b", label: "Enseres y artículos del hogar" },
    { id: "tipoBienesDocumentos", value: "c", label: "Documentos y archivos" },
    { id: "tipoBienesMercancia",  value: "d", label: "Mercancía, productos o inventario" },
    { id: "tipoBienesEquipos",    value: "e", label: "Equipos, herramientas o tecnología" },
    { id: "tipoBienesArticulos",  value: "f", label: "Artículos personales y recuerdos" },
  ]

  // Clases base y por estado para una opción de radio o checkbox
  const radioWrapperClass = (disabled) =>
    `flex items-center gap-3 p-3 rounded-xl border transition-colors ${
      disabled
        ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
        : "border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50"
    }`

  // Maneja el toggle de una opción de P4:
  // - Si se marca: agrega al final del array (preserva orden de selección)
  // - Si se desmarca: filtra del array
  const handleTipoBienesToggle = (value) => {
    const siguiente = tipoBienesOrden.includes(value)
      ? tipoBienesOrden.filter((v) => v !== value)
      : [...tipoBienesOrden, value]
    onTipoBienesChange(siguiente)
  }

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Uso del Deposito</p>
      <div className="h-px bg-orange-100 mb-4" />

      {/* P2: Procedencia de bienes — payload: procedenciaBienes */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-800 mb-3">
          ¿Dónde se encuentran actualmente los bienes que traerá a la bodega?
          <span className="text-red-500 font-semibold">*</span>
        </p>
        <div className="space-y-2">
          {opcionesP2.map(({ id, value, label }) => {
            const disabled = disabledP2.includes(value)
            return (
              <label key={id} htmlFor={id} className={radioWrapperClass(disabled)}>
                <input
                  type="radio"
                  id={id}
                  value={value}
                  disabled={disabled}
                  {...register("procedenciaBienes", { required: true })}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                />
                <span className="text-sm text-gray-800">{label}</span>
              </label>
            )
          })}
        </div>
        {errors.procedenciaBienes && <p className="text-red-500 text-xs mt-1">Por favor seleccione una opción</p>}
      </div>

      {/* P3: Naturaleza de las pertenencias — payload: tipoUso */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-800 mb-3">
          ¿Cuál es la naturaleza de las pertenencias que almacenará?
          <span className="text-red-500 font-semibold">*</span>
        </p>
        <div className="space-y-2">
          {opcionesP3.map(({ id, value, label }) => (
            <label key={id} htmlFor={id} className={radioWrapperClass(false)}>
              <input
                type="radio"
                id={id}
                value={value}
                {...register("tipoUso", { required: true })}
                className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
              />
              <span className="text-sm text-gray-800">{label}</span>
            </label>
          ))}
        </div>
        {errors.tipoUso && <p className="text-red-500 text-xs mt-1">Por favor seleccione una opción</p>}
      </div>

      {/* P4: Tipo de bienes — payload: tipoBienes (array ordenado; al backend llega solo el primero) */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-800 mb-1">
          ¿Qué tipo de bienes almacenará principalmente?
          <span className="text-red-500 font-semibold">*</span>
        </p>
        <p className="text-xs text-gray-400 mb-3">Puede elegir varias opciones</p>
        <div className="space-y-2">
          {opcionesP4.map(({ id, value, label }) => {
            const disabled = disabledP4.includes(value)
            const checked = tipoBienesOrden.includes(value)
            return (
              <label
                key={id}
                htmlFor={id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  disabled
                    ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                    : checked
                    ? "border-orange-500 bg-orange-50 cursor-pointer"
                    : "border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30"
                }`}
              >
                <input
                  type="checkbox"
                  id={id}
                  value={value}
                  disabled={disabled}
                  checked={checked}
                  onChange={() => !disabled && handleTipoBienesToggle(value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-300 accent-orange-500"
                />
                <span className="text-sm text-gray-800">{label}</span>
              </label>
            )
          })}
        </div>
        {errors.tipoBienes && <p className="text-red-500 text-xs mt-1">Debe seleccionar al menos una opción</p>}
      </div>
    </section>
  )
}
