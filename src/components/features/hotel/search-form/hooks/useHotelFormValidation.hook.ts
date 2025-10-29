import { useForm } from 'react-hook-form';
import { HotelFormInput, createHotelValidationRules } from '../utils';

interface UseHotelFormValidationProps {
  defaultLocation: string;
  defaultStartDate: string | null;
  defaultEndDate: string | null;
  defaultAdults?: number;
}

export const useHotelFormValidation = ({
  defaultLocation,
  defaultStartDate,
  defaultEndDate,
  defaultAdults = 1,
}: UseHotelFormValidationProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HotelFormInput>({
    defaultValues: {
      location: defaultLocation,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      adults: defaultAdults,
    },
    values: {
      location: defaultLocation,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      adults: defaultAdults,
    },
  });

  const validationRules = createHotelValidationRules(watch);

  return {
    control,
    handleSubmit,
    errors,
    validationRules,
  };
};
