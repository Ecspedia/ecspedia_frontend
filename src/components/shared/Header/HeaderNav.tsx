
'use client';

import { useRef, useState } from 'react';

import useClickOutSide from '@/hooks/useClickOutside.hooks';
import { useCurrentUser, useLogout } from '@/hooks';
import HeaderComponent from '@/components/shared/Header/HeaderComponent';
import { BotonBell } from '@/components/shared/Header/BotonBell';
import { BotonHeader } from '@/components/shared/Header/BotonHeader';
import DarkModeToggle from '@/components/shared/Header/DarkModeToggle';
import Logo from '@/components/shared/Header/Logo';

export default function HeaderNav() {
  const { username } = useCurrentUser();
  const { logout, isLoading: logoutLoading } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutSide({
    containerRef: menuRef,
    callback: () => setMenuOpen(false),
  });

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <>
      <HeaderComponent>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <BotonBell />
              <BotonHeader texto="Support" ruta="/support" />
              <BotonHeader texto="Trips" ruta="/travel" />
              {username ? (
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-bold text-primary hover:text-secondary transition"
                  >
                    {username}

                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-overlay shadow-lg py-2">
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                        disabled
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                        disabled
                      >
                        Settings
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                        disabled
                      >
                        My Bookings
                      </button>

                      <div className="my-2 border-t border-border" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary disabled:opacity-60"
                      >
                        {logoutLoading ? 'Logging out...' : 'Log out'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <BotonHeader texto="Sign In" ruta="/login" />
              )}
            </div>
          </div>
        </div>
      </HeaderComponent>

    </>
  );
}
