
import DarkModeToggle from './DarkModeToggle';
import HeaderComponent from './HeaderComponent';
import Logo from './Logo';
import { BotonHeader } from './BotonHeader';
import { BotonBell } from './BotonBell';


export default function HeaderNav() {
  return (
    <>
      <HeaderComponent>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <BotonBell />
              <BotonHeader texto="Support" ruta="/support" />
              <BotonHeader texto="Trips" ruta="/travel" />
              <BotonHeader texto="Sign In" ruta="/login" />
            </div>
          </div>
        </div>
      </HeaderComponent>

    </>
  );
}
