import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setEndDate,
  setLocation,
  setStartDate,
  searchHotels,
  selectLocation,
  selectStartDate,
  selectEndDate,
} from '../store/hotelSearchSlice';

export const useHotelSearch = () => {
  const dispatch = useAppDispatch();

  const location = useAppSelector(selectLocation);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const [isSearching, setIsSearching] = useState(false);

  const handleLocationChange = useCallback(
    (selectedLocation: string) => {
      dispatch(setLocation(selectedLocation));
    },
    [dispatch]
  );

  const handleStartDateChange = useCallback(
    (date: Date, field: { onChange: (value: string) => void }) => {
      const isoDate = date.toISOString();
      field.onChange(isoDate);
      dispatch(setStartDate(isoDate));
    },
    [dispatch]
  );

  const handleEndDateChange = useCallback(
    (date: Date, field: { onChange: (value: string) => void }) => {
      const isoDate = date.toISOString();
      field.onChange(isoDate);
      dispatch(setEndDate(isoDate));
    },
    [dispatch]
  );

  const onSubmit = useCallback(async () => {
    setIsSearching(true);
    try {
      await dispatch(searchHotels(location)).unwrap();
    } catch (error) {
      // Error handling can be added here (e.g., toast notification)
      console.error('Failed to search hotels:', error);
    } finally {
      setIsSearching(false);
    }
  }, [dispatch, location]);

  return {
    location,
    startDate,
    endDate,
    isSearching,
    handleLocationChange,
    handleStartDateChange,
    handleEndDateChange,
    onSubmit,
  };
};
