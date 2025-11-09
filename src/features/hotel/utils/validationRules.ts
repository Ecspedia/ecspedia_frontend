import { RegisterOptions, UseFormWatch } from 'react-hook-form';
import { HotelFormInput } from '../types';

export const createHotelValidationRules = (watch: UseFormWatch<HotelFormInput>) => ({
  location: {
    required: 'Location is required',
  } satisfies RegisterOptions<HotelFormInput, 'location'>,

  startDate: {
    required: 'Start date is required',
  } satisfies RegisterOptions<HotelFormInput, 'startDate'>,

  endDate: {
    required: 'End date is required',
    validate: (value: string | null) => {
      const currentStartDate = watch('startDate');
      if (!value) return 'End date cannot be null';
      if (!currentStartDate) return true;

      const endDateObj = new Date(value);
      const startDateObj = new Date(currentStartDate);

      if (Number.isNaN(endDateObj.getTime())) {
        return 'Invalid end date';
      }

      if (Number.isNaN(startDateObj.getTime())) {
        return true;
      }

      if (endDateObj < startDateObj) {
        return 'End date must be after start date';
      }
      return true;
    },
  } satisfies RegisterOptions<HotelFormInput, 'endDate'>,
});

export type HotelValidationRules = ReturnType<typeof createHotelValidationRules>;
