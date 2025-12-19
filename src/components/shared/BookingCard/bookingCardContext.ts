import type { BookingResponseDto } from '@/types/graphql';
import { createContext } from 'react';

export type BookingCardVariant = 'default' | 'compact' | 'chat';

export type BookingCardContextType = {
  booking: BookingResponseDto;
  variant?: BookingCardVariant;
  hotelName?: string | null;
  isPaid?: boolean;
};

export const BookingCardContext = createContext<BookingCardContextType | undefined>(undefined);
