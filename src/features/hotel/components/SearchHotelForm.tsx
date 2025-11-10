import { Button } from '@/components/ui';
import { DateRangeTextField, LocationTextField, GuestSelectionTextField, FormWrapper } from '@/components/shared';
import { Controller } from 'react-hook-form';
import useExpandableFields from '@/hooks/useExpandableFields.hook';
import { LocationFieldType } from '../types';
import { useHotelFormValidation, useHotelSearchApollo } from '../hooks';
import { cn } from '@/utils/utils';

interface SearchHotelFormProps {
  variant?: 'extended' | 'default';
}

export default function SearchHotelForm(searchHotelFormProps: SearchHotelFormProps) {
  const { variant = 'default' } = searchHotelFormProps;
  const isExtended = variant === 'extended';


  const { state, actions } = useHotelSearchApollo();
  const { location, startDate, endDate, adults, isSearching } = state;
  const { handleLocationChange, handleDateRangeChange, handleAdultsChange, onSubmit } = actions;

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


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex items-start justify-center gap-4", isExtended ? 'py-4' : 'p-8')}
    >
      <div className={cn("form-fields flex", isExtended ? 'flex-1 gap-7' : 'gap-4')}>
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
        className={isSearching ? 'w-30 p-4' : 'w-24 p-4'}
        text={isSearching ? 'Searching...' : 'Search'}
        type="submit"
        disabled={isSearching}

      />
    </form>
  );
}
