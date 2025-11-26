'use client';

import { capitalizeUsername } from '@/utils/utils';

interface UserMenuProps {
  username: string;
  isOpen: boolean;
  logoutLoading: boolean;
  onToggle: () => void;
  onMyBookings: () => void;
  onLogout: () => void;
}

export const UserMenu = ({
  username,
  isOpen,
  logoutLoading,
  onToggle,
  onMyBookings: _onMyBookings,
  onLogout,
}: UserMenuProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-bold text-primary transition hover:text-primary-inverse"
      >
        {capitalizeUsername(username)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-overlay py-2 shadow-lg">
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-primary-inverse"
            disabled
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
