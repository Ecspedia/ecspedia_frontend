'use client';

import { capitalizeUsername } from '@/utils/utils';
import Image from 'next/image';
import { User } from 'lucide-react';

interface UserMenuProps {
  username: string;
  profilePhotoUrl?: string;
  isOpen: boolean;
  logoutLoading: boolean;
  onToggle: () => void;
  onMyBookings: () => void;
  onProfile: () => void;
  onLogout: () => void;
}

export const UserMenu = ({
  username,
  profilePhotoUrl,
  isOpen,
  logoutLoading,
  onToggle,
  onMyBookings: _onMyBookings,
  onProfile,
  onLogout,
}: UserMenuProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-primary transition hover:text-primary-inverse"
      >
        {capitalizeUsername(username)}
        {profilePhotoUrl ? (
          <Image
            src={profilePhotoUrl}
            alt={username}
            width={32}
            height={32}
            className="w-10 h-10 rounded-full object-cover border border-border"
            unoptimized
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-overlay py-2 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onProfile();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-primary-inverse"
          >
            Profile
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-primary-inverse"
            disabled
          >
            Settings
          </button>

          <div className="my-2 border-t border-border" />
          <button
            type="button"
            onClick={onLogout}
            disabled={logoutLoading}
            className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary disabled:opacity-60"
          >
            {logoutLoading ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      )}
    </>
  );
};
