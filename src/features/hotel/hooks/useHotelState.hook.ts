'use client';

import { hotelSearchParamsVar, HotelSearchParams, updateHotelSearchParams } from '@/lib/apollo-reactive-vars';
import { useReactiveVar } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { HotelFormInput } from '../types';

export const useHotelState = () => {
  const router = useRouter();
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

  const submitSearch = (formData: HotelFormInput, override?: (payload: HotelSearchParams) => void) => {
    const payload: HotelSearchParams = {
      location: formData.location,
      startDate: formData.startDate ?? '',
      endDate: formData.endDate ?? '',
      adults: formData.adults,
    };

    if (override) {
      override(payload);
      return;
    }

    const params = new URLSearchParams({
      location: payload.location,
      startDate: payload.startDate,
      endDate: payload.endDate,
      adults: String(payload.adults),
    });
    router.push(`/search-hotels?${params.toString()}`);
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
      submitSearch,
    },
  };
};
