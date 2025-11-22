import {
  selectArrivalLocation,
  selectDepartureDate,
  selectDepartureLocation,
  selectReturnDate,
  setArrivalLocation,
  setDepartureDate,
  setDepartureLocation,
  setReturnDate,
  swapLocations,
} from '@/features/flight/store/flightSearchSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

import { DateRangeTextField, FormWrapper, LocationTextField } from '@/components/shared';
import { Button } from '@/components/ui';
import { useExpandableFields } from '@/hooks';
import { ArrowRightLeftIcon } from 'lucide-react';
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
  const returnDateString = useAppSelector(selectReturnDate);
  const departureDate = departureDateString ? new Date(departureDateString) : null;
  const returnDate = returnDateString ? new Date(returnDateString) : null;

  const { getFieldRef, handleFieldClick, closeField, isFieldExpanded } =
    useExpandableFields<LocationFieldType, HTMLDivElement>();

  const handleDepartureSelect = (location: string) => {
    dispatch(setDepartureLocation(location));
    closeField();
  };

  const handleArrivalSelect = (location: string) => {
    dispatch(setArrivalLocation(location));
    closeField();
  };

  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    dispatch(setDepartureDate(startDate.toISOString()));
    dispatch(setReturnDate(endDate.toISOString()));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 p-8">
      <LocationFieldsContainer>
        <FormWrapper ref={getFieldRef(LocationFieldType.DEPARTURE)}>
          <LocationTextField
            placeholder="Leaving from"
            onChange={handleDepartureSelect}
            value={departureValue}
            isOpen={isFieldExpanded(LocationFieldType.DEPARTURE)}
            onOpen={() => handleFieldClick(LocationFieldType.DEPARTURE)}
            onClose={closeField}
          />
        </FormWrapper>
        <LocationSwapButton />
        <FormWrapper ref={getFieldRef(LocationFieldType.ARRIVAL)}>
          <LocationTextField
            placeholder="Going to"
            onChange={handleArrivalSelect}
            value={arrivalValue}
            isOpen={isFieldExpanded(LocationFieldType.ARRIVAL)}
            onOpen={() => handleFieldClick(LocationFieldType.ARRIVAL)}
            onClose={closeField}
          />
        </FormWrapper>
      </LocationFieldsContainer>
      <FormWrapper ref={getFieldRef(LocationFieldType.DATERANGE)}>
        <DateRangeTextField
          isCalendarOpen={isFieldExpanded(LocationFieldType.DATERANGE)}
          onOpenCalendar={() => handleFieldClick(LocationFieldType.DATERANGE)}
          startDate={departureDate}
          endDate={returnDate}
          onDateRangeSelect={handleDateRangeSelect}
          onCalendarClose={closeField}
          placeholder="Departure - Return"
        />
      </FormWrapper>
      <Button

        className={`max-lg:w-full lg:w-24 p-4 lg:p-4}`}

        type="submit"
      >
        Search
      </Button>
    </div>
  );
}

const LocationFieldsContainer = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center">{children}</div>;
};

const LocationSwapButton = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative h-10 w-6 z-10">
      <button
        onClick={() => dispatch(swapLocations())}
        className="border-primary absolute
       left-1/2 -translate-x-1/2 -translate-y-1/2
        top-1/2 z-10  cursor-pointer rounded-full bg-white border p-2 text-brand-secondary"
      >
        <ArrowRightLeftIcon className='p-px' />
      </button>
    </div >
  );
};
