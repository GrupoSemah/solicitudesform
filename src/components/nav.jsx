import Logo from "../assets/almacenajes.webp";
export const Nav = () => {
    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-3xl mx-auto px-4 py-5 flex flex-col items-center gap-3">
                <img
                    src={Logo}
                    alt="Almacenajes Logo"
                    className="h-12 w-auto object-contain"
                />
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Solicitud de Depósito</h1>
                <a href="#logs" className="text-xs text-gray-400 hover:text-orange-500 transition-colors">Ver logs</a>
            </div>
        </nav>
    );
};
