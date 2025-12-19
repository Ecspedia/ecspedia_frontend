'use client';

import { CalendarDays } from 'lucide-react';
import { useBookingCardContext } from '../hooks';
import { formatDate } from '../utils';

interface BookingStayDetailsProps {
  className?: string;
}

export function BookingStayDetails({ className }: BookingStayDetailsProps) {
  const { booking, variant } = useBookingCardContext();

  const isCompact = variant === 'compact' || variant === 'chat';
  const padding = isCompact ? 'p-3' : 'p-4';
  const textSize = isCompact ? 'text-xs' : 'text-sm';
  const headerSize = isCompact ? 'text-xs' : 'text-sm';

  return (
    <div className={`bg-muted dark:bg-overlay rounded-lg ${padding} ${className ?? ''}`}>
      <h4 className={`${headerSize} font-medium text-secondary mb-3 flex items-center gap-2`}>
        <CalendarDays className={isCompact ? 'w-3 h-3' : 'w-4 h-4'} />
        Stay Details
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className={`${textSize} text-secondary mb-1`}>Check-in</p>
          <p className={`${textSize} font-medium text-primary`}>{formatDate(booking.startTime)}</p>
        </div>
        <div>
          <p className={`${textSize} text-secondary mb-1`}>Check-out</p>
          <p className={`${textSize} font-medium text-primary`}>{formatDate(booking.endTime)}</p>
        </div>
      </div>
    </div>
  );
}
