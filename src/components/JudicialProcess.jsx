
export const JudicialProcess = ({ register, judicial, setJudicial }) => {
    return (
        <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Proceso Judicial</p>
            <div className="h-px bg-orange-100 mb-4" />

            <p className="text-sm text-gray-700 font-medium mb-3">
                ¿Forman parte de un proceso judicial los bienes que serán almacenados?
            </p>

            <div className="flex gap-3 mb-4">
                <label htmlFor="judicialSi" className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                    judicial === "si" ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white hover:bg-gray-50"
                }`}>
                    <input
                        type="radio"
                        id="judicialSi"
                        name="judicial"
                        value="si"
                        onChange={() => setJudicial("si")}
                        className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm font-medium">Sí</span>
                </label>
                <label htmlFor="judicialNo" className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                    judicial === "no" || !judicial ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white hover:bg-gray-50"
                }`}>
                    <input
                        type="radio"
                        id="judicialNo"
                        name="judicial"
                        value="no"
                        defaultChecked
                        onChange={() => setJudicial("no")}
                        className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm font-medium">No</span>
                </label>
            </div>

            {judicial === "si" ? (
                <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label
                            htmlFor="nombredemandante"
                            className="block text-xs font-medium text-gray-600 mb-1">
                            Nombre del demandante
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombredemandante"
                            {...register("nombredemandante", { required: true })}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="direcciondemandante"
                            className="block text-xs font-medium text-gray-600 mb-1">
                            Direccion del demandante
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="direcciondemandante"
                            {...register("direcciondemandante", { required: true })}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="telefonodemandante"
                            className="block text-xs font-medium text-gray-600 mb-1">
                            Teléfono
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="telefonodemandante"
                            {...register("telefonodemandante", { required: true })}
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                        />
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </section>
    );
};
