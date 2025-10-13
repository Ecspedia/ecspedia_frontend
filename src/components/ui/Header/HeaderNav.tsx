"use client";

import Link from "next/link";
import { MoveUpLeft } from "lucide-react";
import { BotonBell, BotonHeader } from "./index";

export default function HeaderNav() {
  return (
    <header className="shadow-md sticky top-2 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-400 flex items-center justify-center text-primary ">
                <MoveUpLeft size={35} strokeWidth={2} />
              </div>
              <span className="font-semibold text-primary text-2xl transition-colors duration-300">
                Ecspedia
              </span>
            </Link>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            <BotonBell />
            <BotonHeader texto="Soporte" ruta="/Soporte" />
            <BotonHeader texto="Viajes" ruta="/Viajes" />
            <BotonHeader texto="Iniciar Sesión" ruta="/Login" />
          </div>
        </div>
      </div>
    </header>
  );
}
