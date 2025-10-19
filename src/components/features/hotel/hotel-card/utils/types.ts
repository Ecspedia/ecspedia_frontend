import { Hotel } from '@/types/hotel';
import { createContext } from 'react';

export type HotelCardContext = {
  hotel: Hotel;
};
export const HotelCardContext = createContext<HotelCardContext | undefined>(undefined);
