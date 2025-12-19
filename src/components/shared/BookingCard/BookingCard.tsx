'use client';

import type { BookingResponseDto, HotelResponseDto } from '@/types/graphql';
import { BookingCardContext, BookingCardVariant } from './bookingCardContext';
import { ChatBookingCardVariant } from './variants/ChatBookingCard';
import { MyBookingsCardVariant } from './variants/MyBookingsCard';

interface BookingCardProps {
  booking: BookingResponseDto;
  variant?: BookingCardVariant;
  isPaid?: boolean;
  hotelName?: string | null; // Caller provides hotel name
  hotel?: HotelResponseDto | null; // For mybookings variant hotel preview
  message?: string; // For chat variant
  onDelete?: () => void; // For mybookings variant
  onPay?: () => void; // For mybookings variant
  isPaying?: boolean; // For mybookings variant
  isDeleting?: boolean; // For mybookings variant
}

export default function BookingCard({
  booking,
  variant = 'default',
  isPaid = false,
  hotelName,
  hotel,
  message,
  onDelete,
  onPay,
  isPaying,
  isDeleting,
}: BookingCardProps) {
  const contextValue = {
    booking,
    variant,
    hotelName,
    isPaid,
  };

  return (
    <BookingCardContext.Provider value={contextValue}>
      {variant === 'chat' ? (
        <ChatBookingCardVariant message={message} />
      ) : (
        <MyBookingsCardVariant
          hotel={hotel}
          onDelete={onDelete}
          onPay={onPay}
          isPaying={isPaying}
          isDeleting={isDeleting}
        />
      )}
    </BookingCardContext.Provider>
  );
}

// Compound component exports
BookingCard.Context = BookingCardContext;
