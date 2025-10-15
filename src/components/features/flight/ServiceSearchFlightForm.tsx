import { ArrowsRightLeftIcon } from '@heroicons/react/16/solid';

import {
  selectArrivalLocation,
  selectDepartureDate,
  selectDepartureLocation,
  setArrivalLocation,
  setDepartureDate,
  setDepartureLocation,
  swapLocations,
} from '@/lib/features/flight/flightSearchSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui';
import { DateRangeTextField, LocationTextField } from '@/components/shared';

enum LocationFieldType {
  DEPARTURE = 'departure',
  ARRIVAL = 'arrival',
  DATERANGE = 'date_range',
}

export default function ServiceSearchFlightForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedField(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const departureValue = useAppSelector(selectDepartureLocation);
  const arrivalValue = useAppSelector(selectArrivalLocation);
  const departureDateString = useAppSelector(selectDepartureDate);
  const departureDate = departureDateString ? new Date() : null;

  const [expandedField, setExpandedField] = useState<LocationFieldType | null>(null);

  const handleDepartureSelect = (location: string) => {
    dispatch(setDepartureLocation(location));
    setExpandedField(null);
  };

  const handleArrivalSelect = (location: string) => {
    dispatch(setArrivalLocation(location));
    setExpandedField(null);
  };
  const handleArrivalChange = (date: Date) => {
    dispatch(setDepartureDate(date.toISOString()));
  };

  return (
    <div ref={containerRef} className="flex justify-center gap-4 p-8">
      <div className="flex items-center">
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
            className="text-secondary border-border absolute top-1/2 z-5 -mx-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full border bg-white p-1"
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
      <DateRangeTextField
        isExpanded={expandedField === LocationFieldType.DATERANGE}
        onToggleExpanded={() => setExpandedField(LocationFieldType.DATERANGE)}
        value={departureDate}
        onChange={handleArrivalChange}
        onClose={() => setExpandedField(null)}
      />
      <Button className="bg-secondary w-24" text="Search"></Button>
    </div>
  );
}
