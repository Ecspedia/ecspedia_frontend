'use client';

import Link from 'next/link';
import { MoveUpLeft } from 'lucide-react';
import { BotonBell, BotonHeader } from './index';
import { DarkModeToggle, selectIsDarkMode } from '@/components/features/dark-mode';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';

export default function HeaderNav() {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  return (
    <header
      className={cn(
        'bg-background sticky top-0 z-100 shadow-md transition-colors duration-300',
        isDarkMode ? 'border-border border-b' : ''
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-primary from-accent to-accent flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br">
                <MoveUpLeft size={35} strokeWidth={2} />
              </div>
              <span className="text-primary text-2xl font-semibold transition-colors duration-300">
                Ecspedia
              </span>
            </Link>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />
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
