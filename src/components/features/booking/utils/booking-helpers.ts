/**
 * Booking Business Logic Helpers
 *
 * Pure functions for booking-related calculations and generations
 */

import { Hotel } from '@/types/hotel';
import { BookingDates } from '@/types/booking';

/**
 * Calculate total booking amount
 */
export const calculateTotalAmount = (
  hotel: Hotel | null,
  bookingDates: BookingDates | null
): number => {
  if (!hotel || !bookingDates) return 0;
  return hotel.pricePerNight * bookingDates.nights;
};

/**
 * Generate unique confirmation code
 * Format: BK-{timestamp}-{random}
 */
export const generateConfirmationCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK-${timestamp}-${random}`;
};

/**
 * Calculate number of nights between two dates
 */
export const calculateNights = (checkIn: string, checkOut: string): number => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Validate booking dates
 */
export const validateBookingDates = (checkIn: string, checkOut: string): {
  isValid: boolean;
  error?: string;
} => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate < today) {
    return { isValid: false, error: 'Check-in date cannot be in the past' };
  }

  if (checkOutDate <= checkInDate) {
    return { isValid: false, error: 'Check-out must be after check-in' };
  }

  return { isValid: true };
};
