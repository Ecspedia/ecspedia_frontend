'use client';

import { DesktopNav } from '@/components/shared/Header/DesktopNav';
import HeaderComponent from '@/components/shared/Header/HeaderComponent';
import Logo from '@/components/shared/Header/Logo';
import { MobileNav } from '@/components/shared/Header/MobileNav';
import { useHeaderNav } from '@/components/shared/Header/hooks/useHeaderNav.hook';
import { MainContainer } from '@/components/ui';

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
    toggleMenu,
    toggleMobileMenu,
    closeMobileMenu,
  } = useHeaderNav();

  return (
    <HeaderComponent>
      <MainContainer>
        <div className="relative flex h-16 items-center justify-between px-2">
          <Logo />

          {!isMobile && (
            <DesktopNav
              username={user?.username}
              menuOpen={menuOpen}
              logoutLoading={logoutLoading}
              menuRef={menuRef}
              onToggleMenu={toggleMenu}
              onMyBookings={handleMyBookings}
              onLogout={handleLogout}
            />
          )}

          {isMobile && (
            <MobileNav
              username={user?.username}
              isOpen={mobileMenuOpen}
              logoutLoading={logoutLoading}
              mobileMenuRef={mobileMenuRef}
              onToggle={toggleMobileMenu}
              onClose={closeMobileMenu}
              onMyBookings={handleMyBookings}
              onLogout={handleLogout}
            />
          )}
        </div>
      </MainContainer>
    </HeaderComponent>
  );
}
