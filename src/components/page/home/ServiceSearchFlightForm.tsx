import { ArrowsRightLeftIcon } from "@heroicons/react/16/solid";
import LocationTextField from "./LocationTextField";
import {
  setArrivalLocation,
  setDepartureLocation,
  swapLocations,
} from "@/libs/features/flightSearch/flightSearchSlice";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { useEffect, useRef, useState } from "react";

enum LocationFieldType {
  DEPARTURE = "departure",
  ARRIVAL = "arrival",
}

export default function ServiceSearchFlightForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpandedField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const departureValue = useAppSelector(
    (state) => state.flightSearch.departureLocation,
  );
  const arrivalValue = useAppSelector(
    (state) => state.flightSearch.arrivalLocation,
  );

  const [expandedField, setExpandedField] = useState<LocationFieldType | null>(
    null,
  );

  const handleDepartureSelect = (location: string) => {
    dispatch(setDepartureLocation(location));
    setExpandedField(null);
  };

  const handleArrivalSelect = (location: string) => {
    dispatch(setArrivalLocation(location));
    setExpandedField(null);
  };

  return (
    <div ref={containerRef} className="flex items-center p-8">
      <LocationTextField
        placeholder="Leaving from"
        onLocationSelect={handleDepartureSelect}
        value={departureValue}
        isExpanded={expandedField === LocationFieldType.DEPARTURE}
        onToggleExpanded={() => setExpandedField(LocationFieldType.DEPARTURE)}
        onClose={() => setExpandedField(null)}
      />
      <div className="relative h-10 w-3">
        <button
          onClick={() => dispatch(swapLocations())}
          className="border-primary text-secondary absolute top-1/2 z-5 -mx-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full border bg-white p-1"
        >
          <ArrowsRightLeftIcon />
        </button>
      </div>
      <LocationTextField
        placeholder="Going to"
        onLocationSelect={handleArrivalSelect}
        value={arrivalValue}
        isExpanded={expandedField === LocationFieldType.ARRIVAL}
        onToggleExpanded={() => setExpandedField(LocationFieldType.ARRIVAL)}
        onClose={() => setExpandedField(null)}
      />
    </div>
  );
}
