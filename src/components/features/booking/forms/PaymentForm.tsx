/**
 * Payment Form Component
 *
 * Single Responsibility: Collect and validate payment information
 */

'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useBookingContext } from '../context/BookingContext';
import { PaymentDetails } from '@/types/booking';
import { FormInput, FormTextArea, BookingSummary, FormActions } from '../components';
import {
  validationRules,
  calculateTotalAmount,
  formatCardNumber,
  formatExpiryDate,
  formatCurrency,
  generateConfirmationCode,
} from '../utils';
import { mockPaymentService } from '@/services/mockPaymentService';

export default function PaymentForm() {
  const { state, dispatch } = useBookingContext();
  const { hotel, bookingDates, guestDetails, paymentDetails, isProcessing } = state;

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentDetails>({
    defaultValues: paymentDetails || {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
    },
  });

  const totalAmount = calculateTotalAmount(hotel, bookingDates);
  const testCards = mockPaymentService.getTestCards();

  const onSubmit = async (data: PaymentDetails) => {
    dispatch({ type: 'SET_PAYMENT_DETAILS', payload: data });
    setPaymentError(null);
    dispatch({ type: 'SET_PROCESSING', payload: true });

    try {
      const response = await mockPaymentService.processPayment(data, totalAmount);

      if (response.success) {
        const confirmationCode = generateConfirmationCode();
        dispatch({
          type: 'COMPLETE_BOOKING',
          payload: { response, code: confirmationCode },
        });
      } else {
        setPaymentError(response.message);
        dispatch({ type: 'SET_PROCESSING', payload: false });
      }
    } catch (_error) {
      setPaymentError('An unexpected error occurred. Please try again.');
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  };

  const handleBack = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

      {/* Test Cards Info */}
      <div className="bg-info/10 border border-info rounded-lg p-3 text-sm">
        <p className="font-semibold mb-1">Test Mode - Use Test Cards:</p>
        <p>
          <span className="font-mono text-xs">{testCards.success.number}</span> - Success
        </p>
        <p>
          <span className="font-mono text-xs">{testCards.declined.number}</span> - Declined
        </p>
      </div>

      {/* Payment Summary */}
      <BookingSummary
        hotel={hotel}
        bookingDates={bookingDates}
        guestDetails={guestDetails}
        totalAmount={totalAmount}
        variant="payment"
      />



      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Payment Information</h3>

        <FormInput
          label="Card Number"
          required
          variant="mono"
          register={register('cardNumber', validationRules.cardNumber)}
          error={errors.cardNumber}
          inputProps={{
            maxLength: 19,
            placeholder: '1234 5678 9012 3456',
            onChange: (e) => {
              e.target.value = formatCardNumber(e.target.value);
            },
          }}
        />

        <FormInput
          label="Card Holder Name"
          required
          variant="uppercase"
          register={register('cardHolder', validationRules.cardHolder)}
          error={errors.cardHolder}
          inputProps={{
            placeholder: 'JOHN DOE',
          }}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Expiry Date"
            required
            variant="mono"
            register={register('expiryDate', validationRules.expiryDate)}
            error={errors.expiryDate}
            inputProps={{
              maxLength: 5,
              placeholder: 'MM/YY',
              onChange: (e) => {
                e.target.value = formatExpiryDate(e.target.value);
              },
            }}
          />

          <FormInput
            label="CVV"
            required
            variant="mono"
            register={register('cvv', validationRules.cvv)}
            error={errors.cvv}
            inputProps={{
              maxLength: 4,
              placeholder: '123',
            }}
          />
        </div>

        <FormTextArea
          label="Billing Address (Optional)"
          register={register('billingAddress')}
          textareaProps={{
            rows: 2,
            placeholder: '123 Main St, City, State, ZIP',
          }}
        />
      </div>

      {/* Payment Error */}
      {paymentError && (
        <div className="bg-error/10 border border-error rounded-lg p-3 text-error text-sm">
          {paymentError}
        </div>
      )}

      {/* Actions */}
      <FormActions
        onBack={handleBack}
        submitText={isProcessing ? 'Processing...' : `Pay ${formatCurrency(totalAmount)}`}
        isSubmitting={isProcessing}
        showBack={true}
      />
    </form>
  );
}
