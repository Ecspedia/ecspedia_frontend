/**
 * Booking Summary Component
 *
 * Reusable summary display for booking details
 */

'use client';

import { Hotel } from '@/types/hotel';
import { BookingDates, GuestDetails } from '@/types/booking';
import { formatCurrency } from '../utils';

interface BookingSummaryProps {
  hotel: Hotel | null;
  bookingDates: BookingDates | null;
  guestDetails?: GuestDetails | null;
  totalAmount: number;
  variant?: 'guest' | 'payment';
}

export default function BookingSummary({
  hotel,
  bookingDates,
  guestDetails,
  totalAmount,
  variant = 'guest',
}: BookingSummaryProps) {
  if (!hotel || !bookingDates) return null;

  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-2">
        {variant === 'guest' ? 'Booking Summary' : 'Payment Summary'}
      </h3>
      <div className="text-sm space-y-1">
        {variant === 'payment' && guestDetails && (
          <p>
            <span className="text-muted-foreground">Guest:</span>{' '}
            {guestDetails.firstName} {guestDetails.lastName}
          </p>
        )}
        <p>
          <span className="text-muted-foreground">Hotel:</span> {hotel.name}
        </p>
        <p>
          <span className="text-muted-foreground">Check-in:</span>{' '}
          {bookingDates.checkIn}
        </p>
        <p>
          <span className="text-muted-foreground">Check-out:</span>{' '}
          {bookingDates.checkOut}
        </p>
        <p>
          <span className="text-muted-foreground">Nights:</span>{' '}
          {bookingDates.nights}
          {variant === 'payment' && ` × ${formatCurrency(hotel.pricePerNight)}`}
        </p>
        <p className="font-semibold text-base mt-2 pt-2 border-t border-border">
          <span className="text-muted-foreground">
            {variant === 'payment' ? 'Total Amount:' : 'Total:'}
          </span>{' '}
          {formatCurrency(totalAmount)}
        </p>
      </div>
    </div>
  );
}
