'use client';
import { DateRangeTextField, FormWrapper, GuestSelectionTextField, LocationTextField } from '@/components/shared';
import { Button } from '@/components/ui';
import useExpandableFields from '@/hooks/useExpandableFields.hook';
import { cn } from '@/utils/utils';
import { Controller, SubmitHandler } from 'react-hook-form';

import { HotelSearchParams } from '@/lib/apollo-reactive-vars';
import { useHotelFormValidation, useHotelState } from '../hooks';
import { HotelFormInput, LocationFieldType } from '../types';

interface SearchHotelFormProps {
  variant?: 'extended' | 'default';
  onSubmit?: (data: HotelSearchParams) => void;
  isSearching?: boolean;
}

export default function SearchHotelForm(searchHotelFormProps: SearchHotelFormProps) {
  const { variant = 'default', isSearching = false, onSubmit } = searchHotelFormProps;
  const isExtended = variant === 'extended';


  const { state, actions } = useHotelState();
  const { location, startDate, endDate, adults } = state;
  const { handleLocationChange, handleDateRangeChange, handleAdultsChange, submitSearch } = actions;

  const { control, handleSubmit, errors, validationRules } = useHotelFormValidation({
    defaultLocation: location,
    defaultStartDate: startDate,
    defaultEndDate: endDate,
    defaultAdults: adults,
  });

  const { getFieldRef, handleFieldClick, closeField, isFieldExpanded } = useExpandableFields<
    LocationFieldType,
    HTMLDivElement
  >();

  const handleSubmitForm: SubmitHandler<HotelFormInput> = (formData) => {
    submitSearch(formData, onSubmit);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={cn("flex flex-col lg:items-start lg:justify-center gap-4 lg:flex-row", isExtended ? 'py-4' : 'p-5 lg:p-8')}
    >
      <div className={cn("form-fields flex flex-col lg:flex-row", isExtended ? 'flex-1 gap-7' : 'gap-4')}>
        <FormWrapper ref={getFieldRef(LocationFieldType.LOCATION)} errors={errors.location?.message}
          className={cn(isExtended ? 'flex-1' : '')}
        >
          <Controller
            name="location"
            control={control}
            rules={validationRules.location}
            render={({ field }) => (
              <LocationTextField
                placeholder="Where to?"
                value={field.value}
                onOpen={() => handleFieldClick(LocationFieldType.LOCATION)}
                isOpen={isFieldExpanded(LocationFieldType.LOCATION)}
                onClose={closeField}
                onChange={(location: string) => {
                  field.onChange(location);
                  handleLocationChange(location);
                }}
              />
            )}
          />
        </FormWrapper>
        <FormWrapper
          className={cn(isExtended ? 'flex-1' : '')}
          ref={getFieldRef(LocationFieldType.STARTDATECALENDAR)} errors={errors.startDate?.message || errors.endDate?.message}>
          <Controller
            name="startDate"
            control={control}
            rules={validationRules.startDate}
            render={({ field: startField }) => (
              <Controller
                name="endDate"
                control={control}
                rules={validationRules.endDate}
                render={({ field: endField }) => (
                  <DateRangeTextField
                    placeholder="Dates"
                    isCalendarOpen={isFieldExpanded(LocationFieldType.STARTDATECALENDAR)}
                    onOpenCalendar={() => handleFieldClick(LocationFieldType.STARTDATECALENDAR)}
                    onCalendarClose={closeField}
                    startDate={startField.value ? new Date(startField.value) : null}
                    endDate={endField.value ? new Date(endField.value) : null}
                    onDateRangeSelect={(start, end) => handleDateRangeChange(start, end, startField, endField)}
                  />
                )}
              />
            )}
          />
        </FormWrapper>

        <FormWrapper
          className={cn(isExtended ? 'flex-1' : '')}
          ref={getFieldRef(LocationFieldType.ADULTS)}>
          <Controller
            name="adults"
            control={control}
            defaultValue={adults}
            render={({ field }) => (
              <GuestSelectionTextField
                placeholder="Adults"
                isOpen={isFieldExpanded(LocationFieldType.ADULTS)}
                onOpen={() => handleFieldClick(LocationFieldType.ADULTS)}
                adults={field.value || adults}
                onAdultsSelect={(selectedAdults) => handleAdultsChange(selectedAdults, field)}
                onClose={closeField}
              />
            )}
          />
        </FormWrapper>
      </div>
      <Button

        className={`w-full p-4 lg:w-24 lg:p-4 ${isSearching && 'lg:w-30'}`}

        type="submit"
        disabled={isSearching}
      >
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
