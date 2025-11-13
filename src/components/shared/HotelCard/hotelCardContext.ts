import { createContext } from 'react';
import { Hotel } from '@/types/api';

export type HotelCardContextType = {
  hotel: Hotel;
};

export const HotelCardContext = createContext<HotelCardContextType | undefined>(undefined);
