import { useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import type { CurrentUserQuery } from '@/types/graphql';
import { CURRENT_USER_QUERY } from '@/config/graphql/global.queries';

type CurrentUser = CurrentUserQuery['me'];

interface UseCurrentUserReturn {
  user: CurrentUser;
  isLoading: boolean;
  refetch: () => Promise<void>;
  isAuthenticated: boolean;
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const {
    data,
    loading,
    refetch: refetchQuery,
  } = useQuery<CurrentUserQuery>(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
  });

  const user = data?.me ?? null;
  const isAuthenticated = !!user;

  const refetch = async () => {
    await refetchQuery();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAuthChange = () => {
      refetchQuery();
    };

    window.addEventListener('auth-token-changed', handleAuthChange);

    return () => {
      window.removeEventListener('auth-token-changed', handleAuthChange);
    };
  }, [refetchQuery]);

  return {
    user,
    isLoading: loading,
    refetch,
    isAuthenticated,
  };
};
