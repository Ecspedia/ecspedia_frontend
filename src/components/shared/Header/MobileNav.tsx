'use client';

import { RefObject } from 'react';

import DarkModeToggle from '@/components/shared/Header/DarkModeToggle';
import { capitalizeUsername } from '@/utils/utils';
import { Menu, X, User } from 'lucide-react';
import Image from 'next/image';

interface MobileNavProps {
  username?: string;
  profilePhotoUrl?: string;
  isOpen: boolean;
  logoutLoading: boolean;
  mobileMenuRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onClose: () => void;
  onMyBookings: () => void;
  onProfile: () => void;
  onLogout: () => void;
}

export const MobileNav = ({
  username,
  profilePhotoUrl,
  isOpen,
  logoutLoading,
  mobileMenuRef,
  onToggle,
  onClose,
  onMyBookings,
  onProfile,
  onLogout,
}: MobileNavProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        <button
          type="button"
          onClick={onToggle}
          className="p-2 text-primary transition hover:text-secondary"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute left-0 right-0 top-16 border-t border-border bg-background py-4"
        >
          <div className="flex flex-col gap-2 px-4">
            <a
              href="/support"
              className="px-4 py-2 text-sm font-medium text-primary transition hover:text-primary-inverse"
              onClick={onClose}
            >
              Support
            </a>
            <button
              type="button"
              onClick={() => {
                onMyBookings();
                onClose();
              }}
              className="px-4 py-2 text-left text-sm font-medium text-primary transition hover:text-primary-inverse"
            >
              Bookings
            </button>
            {username ? (
              <>
                <div className="my-2 border-t border-border" />
                <div className="flex items-center gap-3 px-4 py-2">
                  <span className="text-sm font-bold text-primary">
                    {capitalizeUsername(username)}
                  </span>
                  {profilePhotoUrl ? (
                    <Image
                      src={profilePhotoUrl}
                      alt={username}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border border-border"
                      unoptimized
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onProfile();
                    onClose();
                  }}
                  className="px-4 py-2 text-left text-sm text-primary hover:text-secondary"
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

                <div className="my-2 border-t border-border" />
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
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
                className="px-4 py-2 text-sm font-medium text-primary transition hover:text-secondary"
                onClick={onClose}
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};
