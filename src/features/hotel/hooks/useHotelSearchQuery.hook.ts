'use client';

import { useMemo } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client/react';

import { hotelSearchSubmittedParamsVar } from '@/lib/apollo-reactive-vars';
import type { SearchHotelsByLocationQuery, Hotel } from '@/types/graphql';
import { SEARCH_HOTELS_BY_LOCATION } from '../api/hotel.queries';

/**
 * Hook for fetching hotel search results using Apollo useQuery
 * Only runs when search has been submitted via reactive variable
 */
export const useHotelSearchQuery = () => {
  // Read the submitted search params (not the current form values)
  const submittedParams = useReactiveVar(hotelSearchSubmittedParamsVar);

  // Query hotel data (only when search is submitted and we have submitted params)
  const { data, loading, error } = useQuery<SearchHotelsByLocationQuery>(SEARCH_HOTELS_BY_LOCATION, {
    variables: {
      location: submittedParams?.location || '',
    },
    skip: !submittedParams?.location,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  // Process hotels array from response
  const hotels = useMemo<Hotel[]>(() => {
    return data?.hotelsByLocation || [];
  }, [data?.hotelsByLocation]);

  return {
    hotels,
    loading,
    error: error?.message,
    data,
  };
};
