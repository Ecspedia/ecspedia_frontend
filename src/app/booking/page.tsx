/**
 * Booking Page
 *
 * Dedicated page for hotel booking flow
 * Route: /booking?hotel=xxx&dates=xxx
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Hotel } from '@/types/hotel';
import { BookingProvider, useBookingContext, BookingStep } from '@/components/features/booking';
import GuestDetailsForm from '@/components/features/booking/forms/GuestDetailsForm';
import PaymentForm from '@/components/features/booking/forms/PaymentForm';
import BookingConfirmation from '@/components/features/booking/confirmation/BookingConfirmation';
import { ArrowLeft } from 'lucide-react';
import { calculateTotalAmount } from '@/components/features/booking/utils';

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useBookingContext();
  const { currentStep, hotel, bookingDates } = state;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hotelData = searchParams.get('hotel');
    const datesData = searchParams.get('dates');

    if (!hotelData || !datesData) {
      router.push('/');
      return;
    }

    try {
      const parsedHotel: Hotel = JSON.parse(decodeURIComponent(hotelData));
      const parsedDates = JSON.parse(decodeURIComponent(datesData));

      dispatch({
        type: 'INITIALIZE_BOOKING',
        payload: { hotel: parsedHotel, dates: parsedDates },
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to parse booking data:', error);
      router.push('/');
    }
  }, [searchParams, router, dispatch]);

  if (isLoading || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { key: BookingStep.GUEST_DETAILS, label: 'Guest Details' },
    { key: BookingStep.PAYMENT, label: 'Payment' },
    { key: BookingStep.CONFIRMATION, label: 'Confirmation' },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);
  const totalAmount = calculateTotalAmount(hotel, bookingDates);

  const handleBack = () => {
    if (currentStep === BookingStep.GUEST_DETAILS) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          {currentStep === BookingStep.GUEST_DETAILS && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to search results</span>
            </button>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Complete Your Booking</h1>
              <p className="text-muted-foreground mt-1">
                {hotel.name} - {hotel.location}
              </p>
            </div>
            {bookingDates && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-brand-secondary">
                  ${totalAmount}
                </p>
                <p className="text-sm text-muted-foreground">
                  {bookingDates.nights} night{bookingDates.nights !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        {currentStep !== BookingStep.CONFIRMATION && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.slice(0, -1).map((step, index) => (
                <div key={step.key} className="flex items-center flex-1">
                  <div className="flex items-center">
                    {/* Step Circle */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                        ${index <= currentStepIndex
                          ? 'bg-brand-secondary text-white'
                          : 'bg-overlay'
                        }
                      `}
                    >
                      {index + 1}
                    </div>
                    {/* Step Label */}
                    <span
                      className={`
                        ml-3 text-base font-medium
                        ${index <= currentStepIndex
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                        }
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Connector Line */}
                  {index < steps.length - 2 && (
                    <div className="flex-1 h-0.5 mx-6 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Card */}
        <div className="bg-overlay rounded-xl shadow-lg border border-border p-8">
          {currentStep === BookingStep.GUEST_DETAILS && <GuestDetailsForm />}
          {currentStep === BookingStep.PAYMENT && <PaymentForm />}
          {currentStep === BookingStep.CONFIRMATION && <BookingConfirmation />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>🔒 Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading booking page...</p>
          </div>
        </div>
      }
    >
      <BookingProvider>
        <BookingPageContent />
      </BookingProvider>
    </Suspense>
  );
}
