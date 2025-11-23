import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { LOGOUT_MUTATION } from '@/config/graphql/global.mutations';
import { useCurrentUser } from './useCurrentUser.hook';

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const useLogout = (): UseLogoutReturn => {
  const [logoutMutation, { loading }] = useMutation(LOGOUT_MUTATION);
  const router = useRouter();
  const { refetch } = useCurrentUser();

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
      // Backend clears the httpOnly auth_token cookie

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-token-changed'));
      }
      await refetch();
      router.push('/');
    } catch {
      // ignore for now
    }
  }, [logoutMutation, refetch, router]);

  return {
    logout,
    isLoading: loading,
  };
};
