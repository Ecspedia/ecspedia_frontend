import { useContext } from 'react';
import { HotelCardContext } from '../utils';

export function useHotelCardContext() {
  const context = useContext(HotelCardContext);
  if (!context) {
    throw new Error('useHotelCardContext must be used within HotelCard');
  }
  return context;
}
