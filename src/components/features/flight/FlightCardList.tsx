import { flights } from "@/constants/mockFlights";
import FlightCard from "./FlightCard";

export default function FlightCardList() {
  return (
    <div className="flex flex-col gap-4">
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          departureLocation={flight.departureLocation}
          arrivalLocation={flight.arrivalLocation}
          departureTime={flight.departureTime}
          arrivalTime={flight.arrivalTime}
          company={flight.company}
          price={flight.price}
          totalTime={flight.totalTime}
        />
      ))}
    </div>
  );
}
