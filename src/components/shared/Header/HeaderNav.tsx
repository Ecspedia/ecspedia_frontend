'use client';

import { DesktopNav } from '@/components/shared/Header/DesktopNav';
import HeaderComponent from '@/components/shared/Header/HeaderComponent';
import Logo from '@/components/shared/Header/Logo';
import { MobileNav } from '@/components/shared/Header/MobileNav';
import { useHeaderNav } from '@/components/shared/Header/hooks/useHeaderNav.hook';
import { MainContainer } from '@/components/ui';
import { Suspense } from 'react';

export default function HeaderNav() {
  const {
    user,
    isMobile,
    menuOpen,
    mobileMenuOpen,
    logoutLoading,
    menuRef,
    mobileMenuRef,
    handleLogout,
    handleMyBookings,
    handleProfile,
    toggleMenu,
    toggleMobileMenu,
    closeMobileMenu,
  } = useHeaderNav();

  const isDesktop = !isMobile;

  return (
    <HeaderComponent>
      <MainContainer>
        <div className="relative flex h-16 items-center justify-between px-2">
          <Logo />
          <div className="transition-opacity duration-300 ease-in-out">
            <Suspense fallback={<div />}>
              {isDesktop && (
                <DesktopNav
                  username={user?.username}
                  menuOpen={menuOpen}
                  logoutLoading={logoutLoading}
                  menuRef={menuRef}
                  onToggleMenu={toggleMenu}
                  onMyBookings={handleMyBookings}
                  onProfile={handleProfile}
                  onLogout={handleLogout}
                />
              )}

              {isMobile && (
                <MobileNav
                  username={user?.username}
                  profilePhotoUrl={(user as { profilePhotoUrl?: string })?.profilePhotoUrl}
                  isOpen={mobileMenuOpen}
                  logoutLoading={logoutLoading}
                  mobileMenuRef={mobileMenuRef}
                  onToggle={toggleMobileMenu}
                  onClose={closeMobileMenu}
                  onMyBookings={handleMyBookings}
                  onProfile={handleProfile}
                  onLogout={handleLogout}
                />
              )}
            </Suspense>
          </div>
        </div>
      </MainContainer>
    </HeaderComponent>
  );
}