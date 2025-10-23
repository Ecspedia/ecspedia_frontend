import { Flight } from '@/types/flight';
import { createContext } from 'react';

export type FlightCardContext = {
  flight: Flight;
};
export const FlightCardContext = createContext<FlightCardContext | undefined>(undefined);
