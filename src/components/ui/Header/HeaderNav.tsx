import Link from 'next/link';
import { MoveUpLeft } from 'lucide-react';
import { BotonBell, BotonHeader } from './index';

export default function HeaderNav() {
  return (
    <header className="bg-background sticky top-0 z-[100] shadow-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-primary flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-yellow-400 to-yellow-400">
                <MoveUpLeft size={35} strokeWidth={2} />
              </div>
              <span className="text-primary text-2xl font-semibold transition-colors duration-300">
                Ecspedia
              </span>
            </Link>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            <BotonBell />
            <BotonHeader texto="Support" ruta="/support" />
            <BotonHeader texto="Trips" ruta="/travel" />
            <BotonHeader texto="Sign In" ruta="/login" />
          </div>
        </div>
      </div>
    </header>
  );
}
