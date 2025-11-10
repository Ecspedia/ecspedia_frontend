
'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { BotonBell, BotonHeader } from './index';
import { DarkModeToggle } from '@/components/features/dark-mode';
import HeaderComponent from './HeaderComponent';
import Logo from './Logo';
import { CURRENT_USER_QUERY } from '@/graphql/queries';
import { LOGOUT_MUTATION } from '@/graphql/mutations';
import useClickOutSide from '@/hooks/useClickOutside.hooks';

interface CurrentUserQueryData {
  me?: {
    id: string;
    username: string;
    email: string;
  } | null;
}

export default function HeaderNav({ children }: { children: React.ReactNode }) {
  const { data, refetch } = useQuery<CurrentUserQueryData>(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
  });
  const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutSide({
    containerRef: menuRef,
    callback: () => setMenuOpen(false),
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAuthChange = () => {
      refetch();
      setMenuOpen(false);
    };

    window.addEventListener('auth-token-changed', handleAuthChange);

    return () => {
      window.removeEventListener('auth-token-changed', handleAuthChange);
    };
  }, [refetch]);

  const username = data?.me?.username ?? null;

  const handleLogout = async () => {
    try {
      await logoutMutation();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-token-changed'));
      }
      await refetch();
      router.push('/');
    } catch {
      // ignore for now
    } finally {
      setMenuOpen(false);
    }
  };

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
              {username ? (
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-bold text-primary hover:text-secondary transition"
                  >
                    {username}
                    
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-overlay shadow-lg py-2">
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                        disabled
                      >
                        Profile (placeholder)
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-primary hover:text-secondary"
                        disabled
                      >
                        Settings (placeholder)
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
          </div>
        </div>
      </HeaderComponent>
      {children}
    </>
  );
}
