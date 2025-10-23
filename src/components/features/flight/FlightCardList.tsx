import { flights } from '@/constants';
import FlightCard from './FlightCard';

export default function FlightCardList() {
  return (
    <div className="flex flex-col gap-4">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
