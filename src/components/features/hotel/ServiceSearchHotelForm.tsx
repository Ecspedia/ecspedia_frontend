import DateRangeTextField from "@/components/shared/DateRangeTextField";
import LocationTextField from "@/components/shared/LocationTextField";
import Button from "@/components/ui/Button";
import {
  setArrivalLocation,
  setDepartureDate,
  setDepartureLocation,
  swapLocations,
} from "@/libs/features/flight/flightSearchSlice";
import {
  setEndDate,
  setLocation,
  setStartDate,
} from "@/libs/features/hotel/hotelSearchSlice";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
enum LocationFieldType {
  LOCATION = "location",
  STARTDATECALENDAR = "startDateCalendar",
  ENDDATECALENDAR = "endDateCalendar",
}
export default function ServiceSearchHotelForm() {
  const containerRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const locationValue = useAppSelector((state) => state.hotelSearch.location);
  const startDateValue = useAppSelector((state) => state.hotelSearch.startDate);
  const endDateValue = useAppSelector((state) => state.hotelSearch.endDate);

  const startDate = startDateValue ? new Date(startDateValue) : null;
  const endDate = endDateValue ? new Date(endDateValue) : null;

  const [expandedField, setExpandedField] = useState<LocationFieldType | null>(
    null,
  );

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

  const handleLocationSelect = (location: string) => {
    dispatch(setLocation(location));
    setExpandedField(null);
  };

  const handleSelectStartDate = (startDate: Date) => {
    dispatch(setStartDate(startDate.toISOString()));
  };
  const handleSelectEndDate = (endDate: Date) => {
    dispatch(setEndDate(endDate.toISOString()));
  };

  return (
    <form
      ref={containerRef}
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-center gap-4 p-8"
    >
      <div className="flex items-center">
        <LocationTextField
          placeholder="Where to?"
          onLocationSelect={handleLocationSelect}
          value={locationValue}
          isExpanded={expandedField === LocationFieldType.LOCATION}
          onToggleExpanded={() => setExpandedField(LocationFieldType.LOCATION)}
          onClose={() => setExpandedField(null)}
        />
      </div>
      <DateRangeTextField
        placeholder="Start Date"
        isExpanded={expandedField === LocationFieldType.STARTDATECALENDAR}
        onToggleExpanded={() =>
          setExpandedField(LocationFieldType.STARTDATECALENDAR)
        }
        onClose={() => setExpandedField(null)}
        value={startDate}
        onChange={handleSelectStartDate}
      />
      <DateRangeTextField
        placeholder="End Date"
        isExpanded={expandedField === LocationFieldType.ENDDATECALENDAR}
        onToggleExpanded={() =>
          setExpandedField(LocationFieldType.ENDDATECALENDAR)
        }
        onClose={() => setExpandedField(null)}
        value={endDate}
        onChange={handleSelectEndDate}
      />
      <Button className="bg-secondary w-24" text="Search"></Button>
    </form>
  );
}
