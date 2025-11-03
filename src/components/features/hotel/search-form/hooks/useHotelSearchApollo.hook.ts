'use client';

import { useState, useCallback } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client/react';
import { GET_HOTELS_BY_LOCATION } from '@/graphql/queries/hotel.queries';
import { hotelSearchParamsVar, updateHotelSearchParams } from '@/lib/apollo-reactive-vars';

export const useHotelSearchApollo = () => {
  // Read from reactive variables (similar to Redux selectors)
  const searchParams = useReactiveVar(hotelSearchParamsVar);

  // Apollo lazy query for hotel search
  const [searchHotels, { loading, error }] = useLazyQuery(GET_HOTELS_BY_LOCATION, {
    fetchPolicy: 'cache-and-network', // Use cache but fetch fresh data
  });

  // Local state for additional search feedback (optional)
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Update location in reactive variable
   */
  const handleLocationChange = useCallback((selectedLocation: string) => {
    updateHotelSearchParams({ location: selectedLocation });
  }, []);

  /**
   * Update date range in reactive variable
   * Also updates react-hook-form fields
   */
  const handleDateRangeChange = useCallback(
    (
      startDate: Date,
      endDate: Date,
      startField: { onChange: (value: string) => void },
      endField: { onChange: (value: string) => void }
    ) => {
      const startIsoDate = startDate.toISOString();
      const endIsoDate = endDate.toISOString();

      // Update react-hook-form
      startField.onChange(startIsoDate);
      endField.onChange(endIsoDate);

      // Update reactive variable
      updateHotelSearchParams({
        startDate: startIsoDate,
        endDate: endIsoDate,
      });
    },
    []
  );

  /**
   * Update adults count in reactive variable
   * Also updates react-hook-form field
   */
  const handleAdultsChange = useCallback(
    (adults: number, field: { onChange: (value: number) => void }) => {
      // Update react-hook-form
      field.onChange(adults);

      // Update reactive variable
      updateHotelSearchParams({ adults });
    },
    []
  );

  /**
   * Submit search - triggers Apollo query
   * Results are automatically stored in Apollo cache
   */
  const onSubmit = async () => {
    console.log('onSubmit (Apollo)', searchParams.location);

    if (!searchParams.location.trim()) {
      console.warn('Location is required for search');
      return;
    }

    setIsSearching(true);
    try {
      // Trigger Apollo query - results stored in cache automatically
      await searchHotels({
        variables: {
          location: searchParams.location,
        },
      });
    } catch (error) {
      // Error already logged by onError callback
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    state: {
      location: searchParams.location,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      adults: searchParams.adults,
      isSearching: loading || isSearching,
      error: error?.message,
    },
    actions: {
      handleLocationChange,
      handleDateRangeChange,
      handleAdultsChange,
      onSubmit,
    },
  };
};
