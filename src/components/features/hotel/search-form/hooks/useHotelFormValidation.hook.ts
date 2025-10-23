import { useForm } from 'react-hook-form';
import { HotelFormInput, createHotelValidationRules } from '../utils';

interface UseHotelFormValidationProps {
  defaultLocation: string;
  defaultStartDate: string | null;
  defaultEndDate: string | null;
}

export const useHotelFormValidation = ({
  defaultLocation,
  defaultStartDate,
  defaultEndDate,
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
    },
    values: {
      location: defaultLocation,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
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
