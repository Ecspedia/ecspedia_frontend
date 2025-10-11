import { HeaderNav } from "@/components/ui/Header";
import Link from "next/link";

export default function ExpediaHeader() {

    return (
        <>
            <HeaderNav />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Viajes</h1>
                <div className="bg-blue-50 p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold text-blue-900 mb-2">
                        ¡Tu próxima aventura te espera cuando inicies sesión!
                    </h2>
                    <ul className="list-disc pl-5 text-blue-800 space-y-1">
                        <li>
                            Ahorra dinero con Precios para Miembros en miles de hoteles, actividades, alquileres de autos y cruceros
                        </li>
                        <li>
                            Planea y comparte los detalles del viaje con tu grupo de viaje
                        </li>
                        <Link
                            href="/Login"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Iniciar Sesión o Registrarse
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}