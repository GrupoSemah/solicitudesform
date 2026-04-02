
export const PersonalInfo = ({ register, errors, persona, setPersona }) => {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Información Personal</p>
      <div className="h-px bg-orange-100 mb-4" />

      <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-5">
        <button type="button" onClick={() => setPersona("natural")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors cursor-pointer ${
            persona === 'natural' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
          Persona Natural
        </button>
        <button type="button" onClick={() => setPersona("juridica")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors cursor-pointer border-l border-gray-200 ${
            persona === 'juridica' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
          Persona Jurídica
        </button>
      </div>

      {persona === "natural" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="nombrenatural" className="block text-xs font-medium text-gray-600 mb-1">
              Nombre<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombrenatural"
              {...register("nombrenatural", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.nombrenatural ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.nombrenatural && <p className="text-red-500 text-xs mt-1">Por favor ingrese su nombre</p>}
          </div>
          <div>
            <label htmlFor="apellido" className="block text-xs font-medium text-gray-600 mb-1">
              Apellidos<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="apellido"
              {...register("apellido", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.apellido ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.apellido && <p className="text-red-500 text-xs mt-1">Por favor ingrese su apellido</p>}
          </div>
          <div>
            <label htmlFor="cedula" className="block text-xs font-medium text-gray-600 mb-1">
              Cédula o Pasaporte<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cedula"
              {...register("cedula", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.cedula ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.cedula && <p className="text-red-500 text-xs mt-1">Por favor ingrese su cédula o pasaporte</p>}
          </div>
          <div>
            <label htmlFor="nacimiento" className="block text-xs font-medium text-gray-600 mb-1">
              Fecha de nacimiento<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="nacimiento"
              {...register("nacimiento", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.nacimiento ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.nacimiento && <p className="text-red-500 text-xs mt-1">Por favor ingrese su fecha de nacimiento</p>}
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label htmlFor="direccion" className="block text-xs font-medium text-gray-600 mb-1">
              Dirección<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="text"
              {...register("direccion", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.direccion ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">Por favor ingrese su dirección</p>}
          </div>
          <div>
            <label htmlFor="telefonoResidencial" className="block text-xs font-medium text-gray-600 mb-1">
              Teléfono Residencial<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="telefonoResidencial"
              {...register("telefonoResidencial", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.telefonoResidencial ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.telefonoResidencial && <p className="text-red-500 text-xs mt-1">Por favor ingrese su teléfono residencial</p>}
          </div>
          <div>
            <label htmlFor="mobile" className="block text-xs font-medium text-gray-600 mb-1">
              Mobile<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="mobile"
              {...register("mobile", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.mobile ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">Por favor ingrese su número de mobile</p>}
          </div>
          <div>
            <label htmlFor="telefonoOficina" className="block text-xs font-medium text-gray-600 mb-1">
              Teléfono Oficina<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="telefonoOficina"
              {...register("telefonoOficina", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.telefonoOficina ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.telefonoOficina && <p className="text-red-500 text-xs mt-1">Por favor ingrese su teléfono de oficina</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="correo" className="block text-xs font-medium text-gray-600 mb-1">
              E-Mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="correo"
              {...register("correo", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                errors.correo ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1">
                Porfavor ingrese un correo válido
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="confirmeemail" className="block text-xs font-medium text-gray-600 mb-1">
              Confirme su E-Mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="confirmeemail"
              {...register("confirmeemail", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                errors.confirmeemail ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.confirmeemail && (
              <p className="text-red-500 text-xs mt-1">
                Porfavor ingrese un correo válido
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="compania" className="block text-xs font-medium text-gray-600 mb-1">
              Nombre de la compañia<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="compania"
              {...register("compania", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.compania ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.compania && <p className="text-red-500 text-xs mt-1">Por favor ingrese el nombre de la compañía</p>}
          </div>
          <div>
            <label htmlFor="ruc" className="block text-xs font-medium text-gray-600 mb-1">
              R.U.C<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ruc"
              {...register("ruc", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.ruc ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.ruc && <p className="text-red-500 text-xs mt-1">Por favor ingrese el RUC</p>}
          </div>
          <div>
            <label htmlFor="dv" className="block text-xs font-medium text-gray-600 mb-1">
              D.V<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="dv"
              {...register("dv", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.dv ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.dv && <p className="text-red-500 text-xs mt-1">Por favor ingrese el DV</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="representante" className="block text-xs font-medium text-gray-600 mb-1">
              Nombre del Representante Legal
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="representante"
              {...register("representante", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.representante ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.representante && <p className="text-red-500 text-xs mt-1">Por favor ingrese el nombre del representante legal</p>}
          </div>
          <div>
            <label htmlFor="cedularepresentante" className="block text-xs font-medium text-gray-600 mb-1">
              Cédula o Pasaporte<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cedularepresentante"
              {...register("cedularepresentante", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.cedularepresentante ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.cedularepresentante && <p className="text-red-500 text-xs mt-1">Por favor ingrese la cédula del representante</p>}
          </div>
          <div>
            <label htmlFor="percontacto" className="block text-xs font-medium text-gray-600 mb-1">
              Nombre de la persona de contacto
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="percontacto"
              {...register("percontacto", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.percontacto ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.percontacto && <p className="text-red-500 text-xs mt-1">Por favor ingrese el nombre de la persona de contacto</p>}
          </div>
          <div>
            <label htmlFor="cedulacontacto" className="block text-xs font-medium text-gray-600 mb-1">
              Cédula o Pasaporte<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="cedulacontacto"
              {...register("cedulacontacto", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.cedulacontacto ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.cedulacontacto && <p className="text-red-500 text-xs mt-1">Por favor ingrese la cédula de contacto</p>}
          </div>
          <div>
            <label htmlFor="telefonocontacto" className="block text-xs font-medium text-gray-600 mb-1">
              Teléfono Oficina<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="telefonocontacto"
              {...register("telefonocontacto", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.telefonocontacto ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.telefonocontacto && <p className="text-red-500 text-xs mt-1">Por favor ingrese el teléfono de oficina</p>}
          </div>
          <div>
            <label htmlFor="telefonotrabajo" className="block text-xs font-medium text-gray-600 mb-1">
              Teléfono Trabajo<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="telefonotrabajo"
              {...register("telefonotrabajo", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.telefonotrabajo ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.telefonotrabajo && <p className="text-red-500 text-xs mt-1">Por favor ingrese el teléfono de trabajo</p>}
          </div>
          <div>
            <label htmlFor="telefonotrabajo2" className="block text-xs font-medium text-gray-600 mb-1">
              Teléfono Oficina 2<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="telefonotrabajo2"
              {...register("telefonotrabajo2", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.telefonotrabajo2 ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.telefonotrabajo2 && <p className="text-red-500 text-xs mt-1">Por favor ingrese el teléfono de oficina 2</p>}
          </div>
          <div>
            <label htmlFor="mobilejuridico" className="block text-xs font-medium text-gray-600 mb-1">
              Mobile<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="mobilejuridico"
              {...register("mobilejuridico", { required: true })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${errors.mobilejuridico ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.mobilejuridico && <p className="text-red-500 text-xs mt-1">Por favor ingrese el número de mobile</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="correojuridico" className="block text-xs font-medium text-gray-600 mb-1">
              E-Mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="correojuridico"
              {...register("correojuridico", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                errors.correojuridico ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.correojuridico && (
              <p className="text-red-500 text-xs mt-1">
                Porfavor ingrese un correo válido
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="confirmeemailjuridico" className="block text-xs font-medium text-gray-600 mb-1">
              Confirme su E-Mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="confirmeemailjuridico"
              {...register("confirmeemailjuridico", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              className={`w-full h-11 px-3 rounded-lg border text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                errors.confirmeemailjuridico ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.confirmeemailjuridico && (
              <p className="text-red-500 text-xs mt-1">
                Porfavor ingrese un correo válido
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
