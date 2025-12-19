'use client';

import { useBookingCardContext } from '../hooks';
import { getRoomTypeBadgeColor } from '../utils';

interface BookingStatusBadgesProps {
  className?: string;
}

export function BookingStatusBadges({ className }: BookingStatusBadgesProps) {
  const { booking, isPaid } = useBookingCardContext();

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRoomTypeBadgeColor(booking.roomType)}`}
      >
        {booking.roomType}
      </span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          isPaid
            ? 'bg-success/20 text-success'
            : booking.status === 'CANCELED'
              ? 'bg-alert/20 text-alert'
              : 'bg-warning/20 text-warning'
        }`}
      >
        {isPaid ? 'PAID' : booking.status}
      </span>
    </div>
  );
}
