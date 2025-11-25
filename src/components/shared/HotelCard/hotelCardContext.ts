import { createContext } from 'react';
import type { Hotel } from '@/types/graphql';
import type { HotelCardVariant, HotelCardLayout } from './utils/variantConfig';

export type HotelCardContextType = {
  hotel: Hotel;
  variant?: HotelCardVariant;
  layout?: HotelCardLayout;
};

export const HotelCardContext = createContext<HotelCardContextType | undefined>(undefined);
