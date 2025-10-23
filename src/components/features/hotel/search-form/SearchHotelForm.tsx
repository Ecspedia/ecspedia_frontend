import { Button } from '@/components/ui';
import { DateRangeTextField, LocationTextField } from '@/components/shared';
import { Controller } from 'react-hook-form';
import useExpandableFields from '@/hooks/useExpandableFields.hook';
import { LocationFieldType } from './utils';
import FormWrapper from './FormWrapper';
import { useHotelSearch, useHotelFormValidation } from './hooks';

export default function SearchHotelForm() {
  const {
    location,
    startDate,
    endDate,
    isSearching,
    handleLocationChange,
    handleStartDateChange,
    handleEndDateChange,
    onSubmit,
  } = useHotelSearch();

  const { control, handleSubmit, errors, validationRules } = useHotelFormValidation({
    defaultLocation: location,
    defaultStartDate: startDate,
    defaultEndDate: endDate,
  });

  const { containerRef, selectField, closeField, isFieldExpanded } = useExpandableFields<
    LocationFieldType,
    HTMLFormElement
  >();

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-start justify-center gap-4 p-8"
    >
      <FormWrapper errors={errors.location?.message}>
        <Controller
          name="location"
          control={control}
          rules={validationRules.location}
          render={({ field }) => (
            <LocationTextField
              placeholder="Where to go?"
              value={field.value}
              onOpen={() => selectField(LocationFieldType.LOCATION)}
              isOpen={isFieldExpanded(LocationFieldType.LOCATION)}
              onClose={closeField}
              onChange={(location: string) => handleLocationChange(location)}
            />
          )}
        />
      </FormWrapper>
      <FormWrapper errors={errors.startDate?.message}>
        <Controller
          name="startDate"
          control={control}
          rules={validationRules.startDate}
          render={({ field }) => (
            <DateRangeTextField
              placeholder="Start Date"
              isCalendarOpen={isFieldExpanded(LocationFieldType.STARTDATECALENDAR)}
              onOpenCalendar={() => selectField(LocationFieldType.STARTDATECALENDAR)}
              onCalendarClose={closeField}
              selectedDate={field.value ? new Date(field.value) : null}
              onDateSelect={(date) => handleStartDateChange(date, field)}
            />
          )}
        />
      </FormWrapper>
      <FormWrapper errors={errors.endDate?.message}>
        <Controller
          name="endDate"
          control={control}
          rules={validationRules.endDate}
          render={({ field }) => (
            <DateRangeTextField
              placeholder="End Date"
              isCalendarOpen={isFieldExpanded(LocationFieldType.ENDDATECALENDAR)}
              onOpenCalendar={() => selectField(LocationFieldType.ENDDATECALENDAR)}
              onCalendarClose={closeField}
              selectedDate={field.value ? new Date(field.value) : null}
              onDateSelect={(date) => handleEndDateChange(date, field)}
            />
          )}
        />
      </FormWrapper>
      <Button
        className={isSearching ? 'w-30 p-4' : 'w-24 p-4'}
        text={isSearching ? 'Searching...' : 'Search'}
        type="submit"
        disabled={isSearching}
      />
    </form>
  );
}
