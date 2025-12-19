'use client';

import { Button } from '@/components/ui/Button';
import { CalendarDays, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { BookingGuestInfo } from '../guestInfo';
import { useBookingCardContext } from '../hooks';
import { BookingHotelName } from '../hotelName';
import { BookingPrice } from '../price';
import { BookingStatusBadges } from '../statusBadges';
import { BookingStayDetails } from '../stayDetails';

interface ChatBookingCardVariantProps {
  message?: string;
}

export function ChatBookingCardVariant({ message }: ChatBookingCardVariantProps) {
  const { booking } = useBookingCardContext();

  return (
    <div className="flex flex-col gap-2 max-w-[85%]">
      {/* Success Message */}
      {message && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10 text-success">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}

      {/* Booking Card */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-surface-raised dark:bg-surface px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-brand-primary" />
              </div>
              <span className="text-sm font-semibold text-primary">
                Booking #{booking.id.slice(0, 8)}
              </span>
            </div>
            <BookingStatusBadges />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <BookingHotelName />
          <BookingStayDetails />
          <BookingGuestInfo showEmail={false} />
          <BookingPrice />

          {/* See More Details Button - same padding as HotelCard button */}
          <Link href="/my-bookings" className="block">
            <Button variant="secondary" className="w-full p-3 flex items-center justify-center gap-2">
              <span>See more details</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
