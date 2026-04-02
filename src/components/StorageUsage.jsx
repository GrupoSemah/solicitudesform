
export const StorageUsage = ({ register, errors }) => {
    return (
        <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Uso del Deposito</p>
            <div className="h-px bg-orange-100 mb-4" />

            {/* Pregunta 1: Tipo de uso */}
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-800 mb-3">
                    1. ¿Para qué tipo de uso requiere el depósito?
                    <span className="text-red-500 font-semibold">*</span>
                </p>
                <div className="space-y-2">
                    <label htmlFor="tipoUsoResidencial" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoUsoResidencial"
                            value="Residencial (bienes personales/familiares)"
                            {...register("tipoUso", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Residencial (Bienes personales/familiares)</span>
                    </label>
                    <label htmlFor="tipoUsoComercial" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoUsoComercial"
                            value="Comercial (bienes de negocio)"
                            {...register("tipoUso", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Comercial (Bienes de negocio o empresa)</span>
                    </label>
                </div>
                {errors.tipoUso && <p className="text-red-500 text-xs mt-1">Por favor seleccione una opción</p>}
            </div>

            {/* Pregunta 2: Tipo de bienes */}
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-800 mb-3">
                    2. ¿Qué tipo de bienes almacenará principalmente?
                    <span className="text-red-500 font-semibold">*</span>
                </p>
                <div className="space-y-2">
                    <label htmlFor="tipoBienesMuebles" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoBienesMuebles"
                            value="Muebles o mobiliario"
                            {...register("tipoBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Muebles o mobiliario</span>
                    </label>
                    <label htmlFor="tipoBienesEnseres" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoBienesEnseres"
                            value="Enseres del hogar"
                            {...register("tipoBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Enseres del hogar</span>
                    </label>
                    <label htmlFor="tipoBienesDocumentos" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoBienesDocumentos"
                            value="Documentos/archivos"
                            {...register("tipoBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Documentos/archivos</span>
                    </label>
                    <label htmlFor="tipoBienesMercancia" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoBienesMercancia"
                            value="Mercancía/productos"
                            {...register("tipoBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Mercancía/productos</span>
                    </label>
                    <label htmlFor="tipoBienesEquipo" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="tipoBienesEquipo"
                            value="Equipos, herramientas o equipo de tecnología"
                            {...register("tipoBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Equipos, herramientas o equipo de tecnología</span>
                    </label>
                </div>
                {errors.tipoBienes && <p className="text-red-500 text-xs mt-1">Por favor seleccione una opción</p>}
            </div>

            {/* Pregunta 3: Procedencia de bienes */}
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-800 mb-3">
                    3. ¿Dónde estaban estos bienes antes de traerlos al depósito?
                    <span className="text-red-500 font-semibold">*</span>
                </p>
                <div className="space-y-2">
                    <label htmlFor="procedenciaPropio" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="procedenciaPropio"
                            value="Espacio propio o alquilado de uso diario (residencia, oficina, local)"
                            {...register("procedenciaBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Espacio propio o alquilado de uso diario (Residencia, oficina o local comercial)</span>
                    </label>
                    <label htmlFor="procedenciaTercero" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input
                            type="radio"
                            id="procedenciaTercero"
                            value="Espacio de un tercero (proveedor, bodega externa, país de origen)"
                            {...register("procedenciaBienes", { required: true })}
                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-300 accent-orange-500"
                        />
                        <span className="text-sm text-gray-800">Espacio de un tercero (Bodega externa, país de origen)</span>
                    </label>
                </div>
                {errors.procedenciaBienes && <p className="text-red-500 text-xs mt-1">Por favor seleccione una opción</p>}
            </div>
        </section>
    );
};

