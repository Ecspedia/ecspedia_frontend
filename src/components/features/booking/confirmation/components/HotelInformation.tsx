/**
 * Hotel Information Component
 *
 * Single Responsibility: Display hotel and booking date details
 */

'use client';

import { Hotel } from '@/types/hotel';
import { BookingDates } from '@/types/booking';

interface HotelInformationProps {
  hotel: Hotel;
  bookingDates: BookingDates;
}

export default function HotelInformation({ hotel, bookingDates }: HotelInformationProps) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-4">Hotel Details</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Hotel</p>
          <p className="font-medium">{hotel.name}</p>
          <p className="text-sm text-muted-foreground">{hotel.location}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Check-in</p>
            <p className="font-medium">{bookingDates.checkIn}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Check-out</p>
            <p className="font-medium">{bookingDates.checkOut}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="font-medium">
            {bookingDates.nights} night{bookingDates.nights !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
