'use client';

import FormWrapper from '@/components/shared/FormWrapper';
import { TextField } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { selectFilters, updateFilters } from '../stores/hotelSearchSlice';

interface PriceFormData {
  minPrice: number;
  maxPrice: number;
}

export function HotelPriceFilter() {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const { control, watch, formState: { errors, isValid }, reset } = useForm<PriceFormData>({
    defaultValues: {
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    },
    mode: 'onChange',
  });

  const minPrice = watch('minPrice');
  const maxPrice = watch('maxPrice');


  useEffect(() => {
    reset({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
  }, [filters.minPrice, filters.maxPrice, reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValid) {
        dispatch(updateFilters({ minPrice, maxPrice }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, isValid, dispatch]);

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-primary">Nightly price</h3>
      <div className="flex gap-2">
        <FormWrapper errors={errors.minPrice?.message} className="flex-1">
          <Controller
            name="minPrice"
            control={control}
            rules={{
              min: { value: 0, message: 'Must be 0 or higher' },
              validate: (value) => value <= maxPrice || 'Min must be less than max',
            }}
            render={({ field }) => (
              <div>
                <TextField
                  placeholder="Min"
                  value={field.value.toString()}
                  onChange={(value) => field.onChange(parseInt(value.replace(/\D/g, '')) || 0)}
                  className="h-13"
                />
                {errors.minPrice && (
                  <p className="text-xs text-error mt-1">{errors.minPrice.message}</p>
                )}
              </div>
            )}
          />
        </FormWrapper>
        <FormWrapper errors={errors.maxPrice?.message}
          className="flex-1"
        >
          <Controller
            name="maxPrice"
            control={control}
            rules={{
              min: { value: 1, message: 'Must be higher than 0' },
              validate: (value) => value >= minPrice || 'Max must be greater than min',
            }}
            render={({ field }) => (
              <div>
                <TextField
                  placeholder="Max"
                  value={field.value.toString()}
                  onChange={(value) => field.onChange(parseInt(value.replace(/\D/g, '')) || 0)}
                  className="h-13"
                />

              </div>
            )}
          />
        </FormWrapper>
      </div>
    </div>
  );
}
