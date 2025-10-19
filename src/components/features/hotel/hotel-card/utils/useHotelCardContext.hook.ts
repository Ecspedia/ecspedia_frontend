import { useContext } from 'react';
import { HotelCardContext } from './types';

export default function useHotelCardContext() {
  const context = useContext(HotelCardContext);
  if (!context) {
    throw new Error('useHotelCardContent must be used within hotelCard');
  }
  return context;
}
