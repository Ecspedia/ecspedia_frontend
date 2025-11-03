/**
 * Guest Details Form Component
 *
 * Single Responsibility: Collect and validate guest information
 */

'use client';

import { useForm } from 'react-hook-form';
import { useBookingContext } from '../context/BookingContext';
import { GuestDetails } from '@/types/booking';
import { FormInput, FormTextArea, BookingSummary, FormActions } from '../components';
import { validationRules, calculateTotalAmount } from '../utils';

export default function GuestDetailsForm() {
  const { state, dispatch } = useBookingContext();
  const { hotel, bookingDates, guestDetails } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestDetails>({
    defaultValues: guestDetails || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  });

  const totalAmount = calculateTotalAmount(hotel, bookingDates);

  const onSubmit = (data: GuestDetails) => {
    dispatch({ type: 'SET_GUEST_DETAILS', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Booking Summary */}
      <BookingSummary
        hotel={hotel}
        bookingDates={bookingDates}
        totalAmount={totalAmount}
        variant="guest"
      />

      {/* Guest Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Guest Information</h3>

        <FormInput
          label="First Name"
          required
          register={register('firstName', validationRules.firstName)}
          error={errors.firstName}
        />

        <FormInput
          label="Last Name"
          required
          register={register('lastName', validationRules.lastName)}
          error={errors.lastName}
        />

        <FormInput
          label="Email Address"
          type="email"
          required
          register={register('email', validationRules.email)}
          error={errors.email}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          required
          register={register('phone', validationRules.phone)}
          error={errors.phone}
        />

        <FormTextArea
          label="Special Requests (Optional)"
          register={register('specialRequests')}
          textareaProps={{
            rows: 3,
            placeholder: 'E.g., Early check-in, extra pillows, etc.',
          }}
        />
      </div>

      {/* Actions */}
      <FormActions submitText="Continue to Payment" />
    </form>
  );
}
