'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { DateHelper } from '@/utils/dateHelpers';
import { useRouter } from 'next/navigation';
import {
  HotelSearchParams,
  selectFormValues,
  submitSearch as submitSearchAction,
  updateFormValues,
} from '@/stores/globalSlice';
import { HotelFormInput } from '../types';

export const useHotelState = () => {
  //Only for Redux, RHF is handled by the form component
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formValues = useAppSelector(selectFormValues);

  const handleLocationChange = (selectedLocation: string) => {
    dispatch(updateFormValues({ location: selectedLocation }));
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    const startIsoDate = startDate.toISOString();
    const endIsoDate = endDate.toISOString();

    dispatch(
      updateFormValues({
        startDate: startIsoDate,
        endDate: endIsoDate,
      })
    );
  };

  const handleAdultsChange = (adults: number) => {
    dispatch(updateFormValues({ adults }));
  };

  const submitSearch = (formData: HotelFormInput) => {
    const payload: HotelSearchParams = {
      location: formData.location,
      startDate: DateHelper.normalizeDateString(formData.startDate as string),
      endDate: DateHelper.normalizeDateString(formData.endDate as string),
      adults: formData.adults,
    };

    // Update Redux submitted values
    dispatch(submitSearchAction());

    const params = new URLSearchParams({
      location: payload.location,
      startDate: payload.startDate ?? '', //TODO: this paramater is not used in the search-hotels page yet
      endDate: payload.endDate ?? '', //TODO: this paramater is not used in the search-hotels page yet
      adults: String(payload.adults), //TODO: this paramater is not used in the search-hotels page yet
    });
    router.push(`/search-hotels?${params.toString()}`);
  };

  return {
    state: formValues,
    actions: {
      handleLocationChange,
      handleDateRangeChange,
      handleAdultsChange,
      submitSearch,
    },
  };
};
