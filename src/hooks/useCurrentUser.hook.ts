import { CURRENT_USER_QUERY } from '@/config/graphql/global.queries';
import type { CurrentUserQuery } from '@/types/graphql';
import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';

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
  } = useQuery(CURRENT_USER_QUERY, {
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
