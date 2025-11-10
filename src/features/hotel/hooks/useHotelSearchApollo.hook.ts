'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useReactiveVar } from '@apollo/client/react';
import {
  hotelSearchParamsVar,
  updateHotelSearchParams,
  setHotelSearchSubmitted,
} from '@/lib/apollo-reactive-vars';
import { useHotelSearchQuery } from './useHotelSearchQuery.hook';

export const useHotelSearchApollo = () => {
  const router = useRouter();

  // Read from reactive variables (similar to Redux selectors)
  const searchParams = useReactiveVar(hotelSearchParamsVar);

  // Use the hotel search query hook to get data, loading, and error
  const { hotels, loading, error } = useHotelSearchQuery();

  const handleLocationChange = useCallback((selectedLocation: string) => {
    updateHotelSearchParams({ location: selectedLocation });
  }, []);

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

  const handleAdultsChange = useCallback(
    (adults: number, field: { onChange: (value: number) => void }) => {
      // Update react-hook-form
      field.onChange(adults);

      // Update reactive variable
      updateHotelSearchParams({ adults });
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (!searchParams.location.trim()) {
      return;
    }

    // Mark search as submitted and store the submitted params
    setHotelSearchSubmitted(true, searchParams);

    // Navigate to search-hotels page with query parameters
    const params = new URLSearchParams({
      location: searchParams.location,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      adults: searchParams.adults.toString(),
    });

    router.push(`/search-hotels?${params.toString()}`);
  }, [searchParams, router]);

  return {
    state: {
      location: searchParams.location,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      adults: searchParams.adults,
      isSearching: loading,
      error: error,
      data: hotels,
    },
    actions: {
      handleLocationChange,
      handleDateRangeChange,
      handleAdultsChange,
      onSubmit,
    },
  };
};
