'use client';

import { useLazyQuery } from '@apollo/client/react';
import { useCallback, useMemo } from 'react';

import { HotelSearchParams } from '@/lib/apollo-reactive-vars';
import type { Hotel, SearchHotelsByLocationQuery } from '@/types/graphql';
import { SEARCH_HOTELS_BY_LOCATION } from '../api/hotel.queries';

export const useHotelSearchQuery = () => {
  // Only fetch new data when button is clicked (useLazyQuery)
  const [fetchHotels, { data, loading, error }] = useLazyQuery<SearchHotelsByLocationQuery>(
    SEARCH_HOTELS_BY_LOCATION,
    {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    }
  );

  const runQuery = useCallback(
    (params?: HotelSearchParams) => {
      fetchHotels({
        variables: {
          location: params?.location,
        },
      });
    },
    [fetchHotels]
  );

  const hotels = useMemo<Hotel[]>(() => {
    return data?.hotelsByLocation || [];
  }, [data?.hotelsByLocation]);

  return {
    hotels,
    loading,
    error: error?.message,
    runQuery,
  };
};
