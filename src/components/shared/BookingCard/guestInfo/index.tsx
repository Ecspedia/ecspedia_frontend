'use client';

import { Mail, Phone, User } from 'lucide-react';
import { useBookingCardContext } from '../hooks';

interface BookingGuestInfoProps {
  showEmail?: boolean;
  className?: string;
}

export function BookingGuestInfo({ showEmail = true, className }: BookingGuestInfoProps) {
  const { booking, variant } = useBookingCardContext();

  const isCompact = variant === 'compact' || variant === 'chat';
  const padding = isCompact ? 'p-3' : 'p-4';
  const textSize = isCompact ? 'text-xs' : 'text-sm';
  const headerSize = isCompact ? 'text-xs' : 'text-sm';
  const iconSize = isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <div className={`bg-muted dark:bg-overlay rounded-lg ${padding} ${className ?? ''}`}>
      <h4 className={`${headerSize} font-medium text-secondary mb-3 flex items-center gap-2`}>
        <User className={isCompact ? 'w-3 h-3' : 'w-4 h-4'} />
        Guest Information
      </h4>
      <div className={`space-y-2 ${textSize}`}>
        <div className="flex items-center gap-2">
          <User className={`${iconSize} text-secondary`} />
          <span className="text-primary">
            {booking.firstNameGuest} {booking.lastNameGuest}
          </span>
        </div>
        {showEmail && booking.emailGuest && (
          <div className="flex items-center gap-2">
            <Mail className={`${iconSize} text-secondary`} />
            <span className="text-primary">{booking.emailGuest}</span>
          </div>
        )}
        {booking.phoneNumberGuest && (
          <div className="flex items-center gap-2">
            <Phone className={`${iconSize} text-secondary`} />
            <span className="text-primary">{booking.phoneNumberGuest}</span>
          </div>
        )}
      </div>
    </div>
  );
}
