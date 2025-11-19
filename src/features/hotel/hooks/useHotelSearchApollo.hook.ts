'use client';

import { hotelSearchParamsVar, updateHotelSearchParams } from '@/lib/apollo-reactive-vars';
import { useReactiveVar } from '@apollo/client/react';

export const useHotelSearchApollo = () => {
  const searchParams = useReactiveVar(hotelSearchParamsVar);

  const handleLocationChange = (selectedLocation: string) => {
    updateHotelSearchParams({ location: selectedLocation });
  };

  const handleDateRangeChange = (
    startDate: Date,
    endDate: Date,
    startField: { onChange: (value: string) => void },
    endField: { onChange: (value: string) => void }
  ) => {
    const startIsoDate = startDate.toISOString();
    const endIsoDate = endDate.toISOString();
    startField.onChange(startIsoDate);
    endField.onChange(endIsoDate);

    updateHotelSearchParams({
      startDate: startIsoDate,
      endDate: endIsoDate,
    });
  };

  const handleAdultsChange = (adults: number, field: { onChange: (value: number) => void }) => {
    field.onChange(adults);
    updateHotelSearchParams({ adults });
  };

  return {
    state: {
      location: searchParams.location,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      adults: searchParams.adults,
    },
    actions: {
      handleLocationChange,
      handleDateRangeChange,
      handleAdultsChange,
    },
  };
};
