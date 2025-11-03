/**
 * Booking Confirmation Component
 *
 * Single Responsibility: Orchestrate confirmation display using sub-components
 */

'use client';

import { useRouter } from 'next/navigation';
import { useBookingContext } from '../context/BookingContext';
import { calculateTotalAmount } from '../utils';
import {
  ConfirmationHeader,
  ConfirmationCode,
  GuestInformation,
  HotelInformation,
  SpecialRequests,
  PaymentSummary,
  NextSteps,
  ConfirmationActions,
} from './components';

export default function BookingConfirmation() {
  const router = useRouter();
  const { state, dispatch } = useBookingContext();
  const { hotel, guestDetails, bookingDates, confirmationCode, paymentResponse } = state;

  const totalAmount = calculateTotalAmount(hotel, bookingDates);

  const handleClose = () => {
    dispatch({ type: 'RESET_BOOKING' });
    router.push('/');
  };

  const handlePrint = () => {
    window.print();
  };

  // Guard clause - ensure all required data is present
  if (!hotel || !guestDetails || !bookingDates || !confirmationCode) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <ConfirmationHeader />

      {/* Confirmation Code */}
      <ConfirmationCode code={confirmationCode} />

      {/* Guest Information */}
      <GuestInformation guestDetails={guestDetails} />

      {/* Hotel Information */}
      <HotelInformation hotel={hotel} bookingDates={bookingDates} />

      {/* Special Requests (if any) */}
      <SpecialRequests specialRequests={guestDetails.specialRequests} />

      {/* Payment Summary */}
      <PaymentSummary
        totalAmount={totalAmount}
        transactionId={paymentResponse?.transactionId}
      />

      {/* Next Steps */}
      <NextSteps guestEmail={guestDetails.email} />

      {/* Actions */}
      <ConfirmationActions onPrint={handlePrint} onClose={handleClose} />
    </div>
  );
}
