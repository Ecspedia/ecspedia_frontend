import { useContext } from 'react';
import { BookingCardContext } from '../bookingCardContext';

export function useBookingCardContext() {
  const context = useContext(BookingCardContext);
  if (!context) {
    throw new Error('useBookingCardContext must be used within BookingCard');
  }
  return context;
}
