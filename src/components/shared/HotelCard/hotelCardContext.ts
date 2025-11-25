import type { Hotel } from '@/types/graphql';
import { createContext } from 'react';
import type { HotelCardLayout, HotelCardVariant } from './utils/variantConfig';

export type HotelCardContextType = {
  hotel: Hotel;
  variant?: HotelCardVariant;
  layout?: HotelCardLayout;
  isPriority?: boolean;
};

export const HotelCardContext = createContext<HotelCardContextType | undefined>(undefined);
