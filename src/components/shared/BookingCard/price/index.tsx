'use client';

import { useBookingCardContext } from '../hooks';

interface BookingPriceProps {
  className?: string;
}

export function BookingPrice({ className }: BookingPriceProps) {
  const { booking, variant } = useBookingCardContext();

  if (!booking.price) return null;

  const isCompact = variant === 'compact' || variant === 'chat';
  const priceSize = isCompact ? 'text-lg' : 'text-2xl';

  return (
    <div className={`flex justify-between items-center pt-2 border-t border-border ${className ?? ''}`}>
      <span className="text-xs text-secondary">Total Price</span>
      <span className={`${priceSize} font-bold text-primary`}>
        <span className="text-xs font-normal text-secondary mr-1">{booking.currency || 'USD'}</span>
        {booking.price}
      </span>
    </div>
  );
}
