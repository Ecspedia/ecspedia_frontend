import type { Flight } from '@/types/global';
import { createContext } from 'react';

export type FlightCardContext = {
  flight: Flight;
};
export const FlightCardContext = createContext<FlightCardContext | undefined>(undefined);
