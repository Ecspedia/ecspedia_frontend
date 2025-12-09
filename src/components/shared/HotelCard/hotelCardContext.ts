import type { HotelResponseDto } from '@/types/graphql';
import { createContext } from 'react';
import type { HotelCardLayout, HotelCardVariant } from './utils/variantConfig';

export type HotelCardContextType = {
  hotel: HotelResponseDto;
  variant?: HotelCardVariant;
  layout?: HotelCardLayout;
  isPriority?: boolean;
  isSelected?: boolean;
};

export const HotelCardContext = createContext<HotelCardContextType | undefined>(undefined);
