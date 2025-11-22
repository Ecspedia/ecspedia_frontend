'use client';

import { RefObject } from 'react';

import { BotonBell } from '@/components/shared/Header/BotonBell';
import { BotonHeader } from '@/components/shared/Header/BotonHeader';
import DarkModeToggle from '@/components/shared/Header/DarkModeToggle';
import { UserMenu } from '@/components/shared/Header/UserMenu';

interface DesktopNavProps {
  username?: string;
  menuOpen: boolean;
  logoutLoading: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggleMenu: () => void;
  onMyBookings: () => void;
  onLogout: () => void;
}

export const DesktopNav = ({
  username,
  menuOpen,
  logoutLoading,
  menuRef,
  onToggleMenu,
  onMyBookings,
  onLogout,
}: DesktopNavProps) => {
  return (
    <div className="flex items-center gap-3">
      <DarkModeToggle />
      <BotonBell />
      <BotonHeader texto="Support" ruta="/support" />
      <BotonHeader texto="Trips" ruta="/travel" />
      {username ? (
        <div className="relative" ref={menuRef}>
          <UserMenu
            username={username}
            isOpen={menuOpen}
            logoutLoading={logoutLoading}
            onToggle={onToggleMenu}
            onMyBookings={onMyBookings}
            onLogout={onLogout}
          />
        </div>
      ) : (
        <BotonHeader texto="Sign In" ruta="/login" />
      )}
    </div>
  );
};
