import { createContext } from 'react';
import type { Hotel } from '@/types/graphql';

export type HotelCardContextType = {
  hotel: Hotel;
};

export const HotelCardContext = createContext<HotelCardContextType | undefined>(undefined);
