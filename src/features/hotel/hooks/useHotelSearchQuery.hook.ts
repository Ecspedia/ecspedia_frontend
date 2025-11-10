'use client';

import { useMemo } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client/react';
import { SEARCH_HOTELS_BY_LOCATION } from '@/features/hotel/api/graphql/queries/hotel.queries';
import { hotelSearchSubmittedParamsVar } from '@/lib/apollo-reactive-vars';
import { SearchHotelsByLocationData } from '@/types';
import { Hotel } from '@/types/api';

/**
 * Hook for fetching hotel search results using Apollo useQuery
 * Only runs when search has been submitted via reactive variable
 */
export const useHotelSearchQuery = () => {
  // Read the submitted search params (not the current form values)
  const submittedParams = useReactiveVar(hotelSearchSubmittedParamsVar);

  // Query hotel data (only when search is submitted and we have submitted params)
  const { data, loading, error } = useQuery<SearchHotelsByLocationData>(SEARCH_HOTELS_BY_LOCATION, {
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
