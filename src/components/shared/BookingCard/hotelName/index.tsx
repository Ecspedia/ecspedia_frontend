'use client';

import { Building2 } from 'lucide-react';
import { useBookingCardContext } from '../hooks';

interface BookingHotelNameProps {
  className?: string;
}

export function BookingHotelName({ className }: BookingHotelNameProps) {
  const { hotelName, variant } = useBookingCardContext();

  if (!hotelName) return null;

  const isCompact = variant === 'compact' || variant === 'chat';
  const iconSize = isCompact ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = isCompact ? 'text-sm' : 'text-base';

  return (
    <div className={`flex items-center gap-2 ${textSize} ${className ?? ''}`}>
      <Building2 className={`${iconSize} text-brand-primary`} />
      <span className="font-medium text-primary">{hotelName}</span>
    </div>
  );
}
