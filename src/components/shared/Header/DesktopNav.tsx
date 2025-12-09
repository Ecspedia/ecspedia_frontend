

import { RefObject } from 'react';

import { BotonBell } from '@/components/shared/Header/BotonBell';
import { BotonHeader } from '@/components/shared/Header/BotonHeader';
import DarkModeToggle from '@/components/shared/Header/DarkModeToggle';
import { UserMenu } from '@/components/shared/Header/UserMenu';

interface DesktopNavProps {
  username?: string;
  profilePhotoUrl?: string;
  menuOpen: boolean;
  logoutLoading: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggleMenu: () => void;
  onMyBookings: () => void;
  onProfile: () => void;
  onLogout: () => void;
}

export const DesktopNav = ({
  username,
  profilePhotoUrl,
  menuOpen,
  logoutLoading,
  menuRef,
  onToggleMenu,
  onMyBookings,
  onProfile,
  onLogout,
}: DesktopNavProps) => {
  return (
    <div className="flex items-center gap-3">
      <DarkModeToggle />
      <BotonBell />
      <BotonHeader texto="Support" ruta="/support" />
      <BotonHeader texto="Bookings" ruta="/my-bookings" />
      {/* <button
        type="button"
        onClick={onMyBookings}
        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-bold text-primary transition hover:text-primary-inverse"
      >
        Bookings
      </button> */}
      {username ? (
        <div className="relative" ref={menuRef}>
          <UserMenu
            username={username}
            profilePhotoUrl={profilePhotoUrl}
            isOpen={menuOpen}
            logoutLoading={logoutLoading}
            onToggle={onToggleMenu}
            onMyBookings={onMyBookings}
            onProfile={onProfile}
            onLogout={onLogout}
          />
        </div>
      ) : (
        <BotonHeader texto="Sign In" ruta="/login" />
      )}
    </div>
  );
};
