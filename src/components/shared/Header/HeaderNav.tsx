'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { BotonBell } from '@/components/shared/Header/BotonBell';
import { BotonHeader } from '@/components/shared/Header/BotonHeader';
import DarkModeToggle from '@/components/shared/Header/DarkModeToggle';
import HeaderComponent from '@/components/shared/Header/HeaderComponent';
import Logo from '@/components/shared/Header/Logo';
import { MainContainer } from '@/components/ui';
import { useCurrentUser, useLogout } from '@/hooks';
import useClickOutSide from '@/hooks/useClickOutside.hooks';
import { capitalizeUsername } from '@/utils/utils';
import { Menu, X } from 'lucide-react';

export default function HeaderNav() {
  const { user } = useCurrentUser();
  const { logout, isLoading: logoutLoading } = useLogout();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useClickOutSide({
    containerRef: menuRef,
    callback: () => setMenuOpen(false),
  });

  useClickOutSide({
    containerRef: mobileMenuRef,
    callback: () => setMobileMenuOpen(false),
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
          <div className="flex h-16 items-center justify-between px-2">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
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

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <DarkModeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 text-primary hover:text-secondary transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div ref={mobileMenuRef} className="md:hidden border-t border-border py-4">
              <div className="flex flex-col gap-2">
                <a
                  href="/support"
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-secondary transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Support
                </a>
                <a
                  href="/travel"
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-secondary transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trips
                </a>
                {user?.username ? (
                  <>
                    <div className="my-2 border-t border-border" />
                    <span className="px-4 py-2 text-sm font-bold text-primary">
                      {capitalizeUsername(user.username)}
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                      disabled
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                      disabled
                    >
                      Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleMyBookings();
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                    >
                      My Bookings
                    </button>
                    <div className="my-2 border-t border-border" />
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      disabled={logoutLoading}
                      className="px-4 py-2 text-left text-sm text-primary hover:text-secondary disabled:opacity-60"
                    >
                      {logoutLoading ? 'Logging out...' : 'Log out'}
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-primary hover:text-secondary transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </a>
                )}
              </div>
            </div>
          )}
        </MainContainer>
      </HeaderComponent>
    </>
  );
}
