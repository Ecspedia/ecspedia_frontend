
'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import useClickOutSide from '@/hooks/useClickOutside.hooks';
import { useCurrentUser, useLogout } from '@/hooks';
import { capitalizeUsername } from '@/utils/utils';
import HeaderComponent from '@/components/shared/Header/HeaderComponent';
import { BotonBell } from '@/components/shared/Header/BotonBell';
import { BotonHeader } from '@/components/shared/Header/BotonHeader';
import DarkModeToggle from '@/components/shared/Header/DarkModeToggle';
import Logo from '@/components/shared/Header/Logo';
import { MainContainer } from '@/components/ui';

export default function HeaderNav() {
  const { user } = useCurrentUser();
  const { logout, isLoading: logoutLoading } = useLogout();
  const router = useRouter();
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

  const handleMyBookings = () => {
    router.push('/my-bookings');
    setMenuOpen(false);
  };

  return (
    <>
      <HeaderComponent>
        <MainContainer>
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <BotonBell />
              <BotonHeader texto="Support" ruta="/support" />
              <BotonHeader texto="Trips" ruta="/travel" />
              {user?.username ? (
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-bold text-primary hover:text-secondary transition"
                  >
                    {capitalizeUsername(user.username)}
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
                        onClick={handleMyBookings}
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary"
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
        </MainContainer>
      </HeaderComponent>

    </>
  );
}
