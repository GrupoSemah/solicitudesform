import { useEffect } from 'react';
import Confetti from 'react-confetti';
import Logo from '../assets/almacenajes.webp';

export const Completed = () => {
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            window.location.href = '/';
        }, 5000);

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-dvh bg-gradient-to-b from-orange-50 to-white px-4">
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 max-w-md w-full text-center">
                <img
                    src={Logo}
                    alt="Almacenajes Logo"
                    className="h-12 w-auto object-contain mx-auto"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
                    Gracias por haber completado la solicitud
                </h1>
                <p className="text-gray-500 text-sm mt-2">Serás redirigido en unos segundos...</p>
            </div>
        </div>
    );
};
