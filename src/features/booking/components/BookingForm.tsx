'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useReactiveVar } from '@apollo/client/react';
import { Button, MainContainer } from '@/components/ui';
import { Hotel, CreateBookingMutationData, CreateHotelMutationData } from '@/types/api';
import BookingDetails from './BookingDetails';
import PaymentSummary from './PaymentSummary';
import GuestForm, { GuestFormData } from './GuestForm';
import { ArrowLeft } from 'lucide-react';
import { useCurrentUser } from '@/hooks';

import { BOOKINGS_BY_USER_EMAIL_QUERY } from '@/features/booking/api/bookings.queries';
import { DateHelper } from '@/utils/dateHelpers';
import { hotelSearchSubmittedParamsVar } from '@/lib/apollo-reactive-vars';


import { CREATE_BOOKING_MUTATION, CREATE_HOTEL_MUTATION } from '../api/bookings.mutations';
import { hotelToHotelCreateDtoInput } from '@/utils/mapper';



interface BookingFormProps {
    hotel: Hotel;
    onGuestFormSubmit: (data: GuestFormData) => void;
    onConfirmBooking: () => void;
}

export default function BookingForm({ hotel, onGuestFormSubmit, onConfirmBooking: _onConfirmBooking }: BookingFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useCurrentUser();
    const [guestFormData, setGuestFormData] = useState<GuestFormData | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createHotel, { loading: isCreatingHotel }] = useMutation<CreateHotelMutationData>(CREATE_HOTEL_MUTATION);
    const [createBooking, { loading: isCreatingBooking }] = useMutation<CreateBookingMutationData>(CREATE_BOOKING_MUTATION);

    const submittedParams = useReactiveVar(hotelSearchSubmittedParamsVar);
    const startDate = searchParams.get('startDate') || submittedParams?.startDate || DateHelper.getToday().toString();
    const endDate = searchParams.get('endDate') || submittedParams?.endDate || DateHelper.pastTomorrow().toString();

    const handleGuestFormSubmit = (data: GuestFormData) => {
        setGuestFormData(data);
        onGuestFormSubmit(data);
    };

    const handleFormChange = useCallback((data: GuestFormData | null, isValid: boolean) => {
        setGuestFormData(data);
        setIsFormValid(isValid);
    }, []);

    const handleConfirmBooking = async () => {
        if (!guestFormData || !user?.id) {
            return;
        }

        setError(null);

        try {
            const hotelCreateDto = hotelToHotelCreateDtoInput(hotel);

            const { data: hotelData } = await createHotel({
                variables: {
                    hotelCreateDto,
                },
            });

            if (!hotelData?.createHotel) {
                setError('Failed to create hotel. Please try again.');
                return;
            }

            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            const startTime = new Date(startDateObj);
            startTime.setHours(15, 0, 0, 0);

            const endTime = new Date(endDateObj);
            endTime.setHours(11, 0, 0, 0);

            const bookingResult = await createBooking({
                variables: {
                    hotelId: hotelData.createHotel.id,
                    userId: user.id,
                    firstNameGuest: guestFormData.firstName,
                    lastNameGuest: guestFormData.lastName,
                    emailGuest: guestFormData.email,
                    phoneNumberGuest: guestFormData.phone,
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    price: hotel.pricePerNight,
                    currency: 'USD',
                },
                refetchQueries: [
                    {
                        query: BOOKINGS_BY_USER_EMAIL_QUERY,
                        variables: { email: user.email },
                    },
                ],
                awaitRefetchQueries: true,
            });

            // Check if booking was created successfully
            if (bookingResult.data?.createBooking) {
                // Navigate to my-bookings page after successful booking
                // Use replace instead of push to prevent back navigation to booking form
                try {
                    router.replace('/my-bookings');
                } catch (_navError) {
                    // Fallback to window.location if router fails
                    window.location.href = '/my-bookings';
                }
            } else {
                setError('Failed to create booking. Please try again.');
            }
        } catch (err: unknown) {
            // Check if the error contains booking data (Apollo can return data even with errors)
            if (err && typeof err === 'object' && 'data' in err) {
                const errorWithData = err as { data?: { createBooking?: unknown } };
                if (errorWithData.data?.createBooking) {
                    // Booking was created successfully despite error, navigate anyway
                    try {
                        router.replace('/my-bookings');
                    } catch (_navError) {
                        window.location.href = '/my-bookings';
                    }
                    return;
                }
            }

            let errorMessage = 'An unexpected error occurred. Please try again.';

            if (err && typeof err === 'object') {
                if ('graphQLErrors' in err) {
                    const graphQLError = err as { graphQLErrors: Array<{ message: string }> };
                    errorMessage = graphQLError.graphQLErrors?.[0]?.message || errorMessage;
                } else if ('networkError' in err) {
                    const networkError = err as { networkError: { message?: string } };
                    errorMessage = networkError.networkError?.message || 'Network error. Please check your connection.';
                } else if ('message' in err) {
                    errorMessage = (err as { message: string }).message;
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        }
    };

    return (
        <MainContainer className='pb-18 px-9 sm:px-11 md:px-14 lg:px-28 xl:px-36'>
            <div className="my-4">
                <Button
                    onClick={() => router.back()}
                    variant="blank"
                    className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-4 p-0 font-medium group"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to results
                </Button>
                <h1 className="text-3xl font-bold text-primary mb-2">Complete Your Booking</h1>
                <p className="text-secondary">Review your booking details and complete your reservation</p>
            </div>

            <BookingDetails hotel={hotel} />
            <GuestForm onSubmit={handleGuestFormSubmit} onFormChange={handleFormChange} defaultEmail={user?.email || ''} />
            <PaymentSummary hotel={hotel} nights={1} />

            {error && (
                <div className="mb-4 rounded-lg bg-error/20 border border-error p-4">
                    <p className="text-error text-sm font-medium">{error}</p>
                </div>
            )}

            <div className="flex gap-4">
                <Button
                    onClick={() => router.back()}
                    variant="blank"
                    className="flex-1 bg-surface border border-border text-primary hover:bg-surface-raised/80 px-6 py-3 font-medium"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirmBooking}
                    variant="secondary"
                    className="flex-1 px-6 py-3 font-medium"
                    disabled={!isFormValid || !user || isCreatingHotel || isCreatingBooking}
                >
                    {isCreatingHotel || isCreatingBooking ? 'Creating Booking...' : 'Confirm Booking'}
                </Button>
            </div>

        </MainContainer>
    );
}
