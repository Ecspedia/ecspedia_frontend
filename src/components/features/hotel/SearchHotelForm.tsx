import { Button } from '@/components/ui';
import { DateRangeTextField, LocationTextField } from '@/components/shared';
import {
  setEndDate,
  setLocation,
  setStartDate,
  searchHotels,
  selectLocation,
  selectStartDate,
  selectEndDate,
} from '@/lib/features/hotel/hotelSearchSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

enum LocationFieldType {
  LOCATION = 'location',
  STARTDATECALENDAR = 'startDateCalendar',
  ENDDATECALENDAR = 'endDateCalendar',
}

interface HotelFormInput {
  location: string;
  startDate: string | null;
  endDate: string | null;
}

export default function SearchHotelForm() {
  const containerRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const locationValue = useAppSelector(selectLocation);
  const startDateValue = useAppSelector(selectStartDate);
  const endDateValue = useAppSelector(selectEndDate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelFormInput>({
    defaultValues: {
      location: locationValue,
      startDate: startDateValue,
      endDate: endDateValue,
    },
  });

  const [expandedField, setExpandedField] = useState<LocationFieldType | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedField(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const onSubmit = async (data: HotelFormInput) => {
    setIsSearching(true);
    await dispatch(searchHotels(data.location));
    setIsSearching(false);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-start justify-center gap-4 p-8"
    >
      <div className="flex flex-col gap-1">
        <Controller
          name="location"
          control={control}
          rules={{
            required: 'Location is required',
          }}
          render={({ field }) => (
            <LocationTextField
              placeholder="Where to?"
              onLocationSelect={(location) => {
                field.onChange(location);
                handleLocationSelect(location);
              }}
              value={field.value}
              isExpanded={expandedField === LocationFieldType.LOCATION}
              onToggleExpanded={() => setExpandedField(LocationFieldType.LOCATION)}
              onClose={() => setExpandedField(null)}
            />
          )}
        />
        {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: 'Start date is required',
          }}
          render={({ field }) => (
            <DateRangeTextField
              placeholder="Start Date"
              isExpanded={expandedField === LocationFieldType.STARTDATECALENDAR}
              onToggleExpanded={() => setExpandedField(LocationFieldType.STARTDATECALENDAR)}
              onClose={() => setExpandedField(null)}
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date.toISOString());
                handleSelectStartDate(date);
              }}
            />
          )}
        />
        {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: 'End date is required',
            validate: (value) => {
              const { startDate } = control._formValues;
              if (!value) {
                return 'End Date cant be null';
              }
              if (new Date(value) < new Date(startDate)) {
                return 'End date must be after start date';
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DateRangeTextField
              placeholder="End Date"
              isExpanded={expandedField === LocationFieldType.ENDDATECALENDAR}
              onToggleExpanded={() => setExpandedField(LocationFieldType.ENDDATECALENDAR)}
              onClose={() => setExpandedField(null)}
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date.toISOString());
                handleSelectEndDate(date);
              }}
            />
          )}
        />
        {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
      </div>

      <Button
        className={isSearching ? 'w-30 p-4' : 'w-24 p-4'}
        text={isSearching ? 'Searching...' : 'Search'}
        type="submit"
        disabled={isSearching}
      />
    </form>
  );
}
