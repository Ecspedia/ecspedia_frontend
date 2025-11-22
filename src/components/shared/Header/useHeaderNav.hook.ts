'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { useCurrentUser, useIsMobile, useLogout } from '@/hooks';
import useClickOutSide from '@/hooks/useClickOutside.hooks';

export const useHeaderNav = () => {
  const { user } = useCurrentUser();
  const { logout, isLoading: logoutLoading } = useLogout();
  const router = useRouter();
  const isMobile = useIsMobile();

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
    setMobileMenuOpen(false);
  };

  const handleMyBookings = () => {
    router.push('/my-bookings');
    setMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return {
    user,
    isMobile,
    menuOpen,
    mobileMenuOpen,
    logoutLoading,
    menuRef,
    mobileMenuRef,
    handleLogout,
    handleMyBookings,
    toggleMenu,
    toggleMobileMenu,
    closeMobileMenu,
  };
};
