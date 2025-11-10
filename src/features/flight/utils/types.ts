import { Flight } from '@/types/api';
import { createContext } from 'react';

export type FlightCardContext = {
  flight: Flight;
};
export const FlightCardContext = createContext<FlightCardContext | undefined>(undefined);
