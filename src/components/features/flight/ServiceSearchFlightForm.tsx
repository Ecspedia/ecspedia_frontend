import {
  selectArrivalLocation,
  selectDepartureDate,
  selectDepartureLocation,
  setArrivalLocation,
  setDepartureDate,
  setDepartureLocation,
  swapLocations,
} from '@/components/features/flight/store/flightSearchSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

import { Button } from '@/components/ui';
import { DateRangeTextField, LocationTextField } from '@/components/shared';
import { ArrowRightLeftIcon } from 'lucide-react';
import { useExpandableFields } from '@/hooks';
import { PropsWithChildren } from 'react';

enum LocationFieldType {
  DEPARTURE = 'departure',
  ARRIVAL = 'arrival',
  DATERANGE = 'date_range',
}

export default function ServiceFlightForm() {
  const dispatch = useAppDispatch();
  const departureValue = useAppSelector(selectDepartureLocation);
  const arrivalValue = useAppSelector(selectArrivalLocation);
  const departureDateString = useAppSelector(selectDepartureDate);
  const departureDate = departureDateString ? new Date(departureDateString) : null;

  const { containerRef, selectField, closeField, isFieldExpanded } =
    useExpandableFields<LocationFieldType>();

  const handleDepartureSelect = (location: string) => {
    dispatch(setDepartureLocation(location));
    closeField();
  };

  const handleArrivalSelect = (location: string) => {
    dispatch(setArrivalLocation(location));
    closeField();
  };
  const handleDepartureDate = (date: Date) => {
    dispatch(setDepartureDate(date.toISOString()));
  };

  return (
    <div ref={containerRef} className="flex justify-center gap-4 p-8">
      <LocationFieldsContainer>
        <LocationTextField
          placeholder="Leaving from"
          onChange={handleDepartureSelect}
          value={departureValue}
          isOpen={isFieldExpanded(LocationFieldType.DEPARTURE)}
          onOpen={() => selectField(LocationFieldType.DEPARTURE)}
          onClose={closeField}
        />
        <LocationSwapButton />
        <LocationTextField
          placeholder="Going to"
          onChange={handleArrivalSelect}
          value={arrivalValue}
          isOpen={isFieldExpanded(LocationFieldType.ARRIVAL)}
          onOpen={() => selectField(LocationFieldType.ARRIVAL)}
          onClose={closeField}
        />
      </LocationFieldsContainer>
      <DateRangeTextField
        isCalendarOpen={isFieldExpanded(LocationFieldType.DATERANGE)}
        onOpenCalendar={() => selectField(LocationFieldType.DATERANGE)}
        selectedDate={departureDate}
        onDateSelect={handleDepartureDate}
        onCalendarClose={closeField}
      />
      <Button className="bg-secondary w-24" text="Search"></Button>
    </div>
  );
}

const LocationFieldsContainer = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center">{children}</div>;
};

const LocationSwapButton = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative h-10 w-3">
      <button
        onClick={() => dispatch(swapLocations())}
        className="text-secondary border-border absolute top-1/2 z-5 -mx-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full border bg-white p-1"
      >
        <ArrowRightLeftIcon />
      </button>
    </div>
  );
};
