import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setEndDate,
  setLocation,
  setStartDate,
  setAdults,
  searchHotels,
  selectLocation,
  selectStartDate,
  selectEndDate,
  selectAdults,
} from '../stores/hotelSearchSlice';

export const useHotelSearch = () => {
  const dispatch = useAppDispatch();

  const location = useAppSelector(selectLocation);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const adults = useAppSelector(selectAdults);

  const [isSearching, setIsSearching] = useState(false);

  const handleLocationChange = useCallback(
    (selectedLocation: string) => {
      dispatch(setLocation(selectedLocation));
    },
    [dispatch]
  );

  const handleDateRangeChange = useCallback(
    (
      startDate: Date,
      endDate: Date,
      startField: { onChange: (value: string) => void },
      endField: { onChange: (value: string) => void }
    ) => {
      const startIsoDate = startDate.toISOString();
      const endIsoDate = endDate.toISOString();

      startField.onChange(startIsoDate);
      endField.onChange(endIsoDate);

      dispatch(setStartDate(startIsoDate));
      dispatch(setEndDate(endIsoDate));
    },
    [dispatch]
  );

  const handleAdultsChange = useCallback(
    (adults: number, field: { onChange: (value: number) => void }) => {
      field.onChange(adults);
      dispatch(setAdults(adults));
    },
    [dispatch]
  );

  const onSubmit = async () => {
    setIsSearching(true);
    try {
      await dispatch(searchHotels(location)).unwrap();
    } catch (error) {
      // Error handling can be added here (e.g., toast notification)
      console.error('Failed to search hotels:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    state: {
      location,
      startDate,
      endDate,
      adults,
      isSearching,
    },
    actions: {
      handleLocationChange,
      handleDateRangeChange,
      handleAdultsChange,
      onSubmit,
    },
  };
};
