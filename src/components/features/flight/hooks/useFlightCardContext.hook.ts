import { useContext } from 'react';
import { FlightCardContext } from '../utils/types';

export default function useFlightCardContext() {
  const context = useContext(FlightCardContext);
  if (!context) {
    throw new Error('useFlightCardContext must be used within FlightCard');
  }
  return context;
}
