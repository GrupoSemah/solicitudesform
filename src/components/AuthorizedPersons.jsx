export const AuthorizedPersons = ({ register, errors }) => {
    return (
        <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Personas Autorizadas</p>
            <div className="h-px bg-orange-100 mb-4" />
            <p className="text-xs text-gray-500 mb-4">Personas autorizadas por el arrendatario para ingresar al depósito</p>

            {/* Persona 1 — Obligatoria */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3 mb-3">
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide">Persona 1 — Obligatoria</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                        <label htmlFor="nombre1" className="block text-xs font-medium text-gray-600 mb-1">
                            Nombre
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombre1"
                            {...register("nombre1", {
                                required: true
                            })}
                            className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.nombre1 ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.nombre1 && <p className="text-red-500 text-xs mt-1">Por favor ingrese el nombre</p>}
                    </div>
                    <div>
                        <label htmlFor="telefono1" className="block text-xs font-medium text-gray-600 mb-1">
                            Teléfono
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="telefono1"
                            {...register("telefono1", {
                                required: true
                            })}
                            className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.telefono1 ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.telefono1 && <p className="text-red-500 text-xs mt-1">Por favor ingrese el teléfono</p>}
                    </div>
                    <div>
                        <label htmlFor="mobile1" className="block text-xs font-medium text-gray-600 mb-1">
                            Mobile
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="mobile1"
                            {...register("mobile1", {
                                required: true
                            })}
                            className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.mobile1 ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.mobile1 && <p className="text-red-500 text-xs mt-1">Por favor ingrese el mobile</p>}
                    </div>
                    <div>
                        <label htmlFor="email1" className="block text-xs font-medium text-gray-600 mb-1">
                            E-mail
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email1"
                            {...register(
                                "email1",
                                {
                                    required: true,
                                    pattern:
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                }
                            )}
                            className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                                errors.email1 ? "border-red-400" : "border-gray-200"
                            }`}
                        />
                        {errors.email1 && (
                            <p className="text-red-500 text-xs mt-1">
                                Porfavor ingrese un correo válido
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Persona 2 — Opcional */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3 mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Persona 2 — Opcional</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                        <label htmlFor="nombre2" className="block text-xs font-medium text-gray-600 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre2"
                            {...register("nombre2")}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="telefono2" className="block text-xs font-medium text-gray-600 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono2"
                            {...register("telefono2")}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile2" className="block text-xs font-medium text-gray-600 mb-1">
                            Mobile
                        </label>
                        <input
                            type="text"
                            id="mobile2"
                            {...register("mobile2")}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email2" className="block text-xs font-medium text-gray-600 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email2"
                            {...register("email2", {
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                            className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                                errors.email2 ? "border-red-400" : "border-gray-200"
                            }`}
                        />
                        {errors.email2 && (
                            <p className="text-red-500 text-xs mt-1">
                                Porfavor ingrese un correo válido
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Persona 3 — Opcional */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3 mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Persona 3 — Opcional</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                        <label htmlFor="nombre3" className="block text-xs font-medium text-gray-600 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre3"
                            {...register("nombre3")}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="telefono3" className="block text-xs font-medium text-gray-600 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono3"
                            {...register("telefono3")}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile3" className="block text-xs font-medium text-gray-600 mb-1">
                            Mobile
                        </label>
                        <input
                            type="text"
                            id="mobile3"
                            {...register("mobile3")}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email3" className="block text-xs font-medium text-gray-600 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email3"
                            {...register("email3", {
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                            className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                                errors.email3 ? "border-red-400" : "border-gray-200"
                            }`}
                        />
                        {errors.email3 && (
                            <p className="text-red-500 text-xs mt-1">
                                Porfavor ingrese un correo válido
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
