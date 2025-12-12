'use client';

import { Button, MainContainer } from '@/components/ui';
import { useCurrentUser } from '@/hooks';
import type { CreateBookingMutation, HotelResponseDto } from '@/types/graphql';
import { useMutation } from '@apollo/client/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import BookingConfirmation from './BookingConfirmation';
import BookingStepper, { BOOKING_STEPS } from './BookingStepper';
import GuestForm, { GuestFormData } from './GuestForm';
import RoomSelection, { RoomType } from './RoomSelection';

import { BOOKINGS_BY_USER_EMAIL_QUERY } from '@/features/booking/api/bookings.queries';
import { DateHelper } from '@/utils/dateHelpers';
import { CREATE_BOOKING_MUTATION } from '../api/bookings.mutations';

interface BookingFormProps {
    hotel: HotelResponseDto;
    onGuestFormSubmit: (data: GuestFormData) => void;
    onConfirmBooking: () => void;
}

export default function BookingForm({ hotel, onGuestFormSubmit, onConfirmBooking: _onConfirmBooking }: BookingFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useCurrentUser();

    // Step state
    const [currentStep, setCurrentStep] = useState(1);

    // Room selection state
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

    // Guest form state
    const [guestFormData, setGuestFormData] = useState<GuestFormData | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    // Booking state
    const [error, setError] = useState<string | null>(null);

    const [createBooking, { loading: isCreatingBooking }] = useMutation<CreateBookingMutation>(CREATE_BOOKING_MUTATION);

    const startDate = searchParams.get('startDate') || DateHelper.getToday().toString();
    const endDate = searchParams.get('endDate') || DateHelper.pastTomorrow().toString();

    // Calculate nights
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const nights = Math.max(1, Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)));

    const handleGuestFormSubmit = (data: GuestFormData) => {
        setGuestFormData(data);
        onGuestFormSubmit(data);
    };

    const handleFormChange = useCallback((data: GuestFormData | null, isValid: boolean) => {
        setGuestFormData(data);
        setIsFormValid(isValid);
    }, []);

    const handleRoomSelect = (room: RoomType) => {
        setSelectedRoom(room);
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return selectedRoom !== null;
            case 2:
                return isFormValid && guestFormData !== null;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const handleConfirmBooking = async () => {
        if (!guestFormData || !user?.id || !selectedRoom) {
            return;
        }

        setError(null);

        try {


            const startTime = new Date(startDateObj);
            startTime.setHours(15, 0, 0, 0);

            const endTime = new Date(endDateObj);
            endTime.setHours(11, 0, 0, 0);

            const roomPrice = Math.round(hotel.pricePerNight * selectedRoom.priceMultiplier);

            const bookingResult = await createBooking({
                variables: {
                    bookingCreateDto: {
                        hotelId: hotel.id,
                        userId: user.id,
                        firstNameGuest: guestFormData.firstName,
                        lastNameGuest: guestFormData.lastName,
                        emailGuest: guestFormData.email,
                        phoneNumberGuest: guestFormData.phone,
                        startTimeIso: startTime.toISOString(),
                        endTimeIso: endTime.toISOString(),
                        price: roomPrice * nights,
                        currency: 'USD',
                    },
                },
                refetchQueries: [
                    {
                        query: BOOKINGS_BY_USER_EMAIL_QUERY,
                        variables: { email: user.email },
                    },
                ],
                awaitRefetchQueries: true,
            });

            if (bookingResult.data?.createBooking) {
                try {
                    router.replace('/my-bookings');
                } catch (_navError) {
                    window.location.href = '/my-bookings';
                }
            } else {
                setError('Failed to create booking. Please try again.');
            }
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'data' in err) {
                const errorWithData = err as { data?: { createBooking?: unknown } };
                if (errorWithData.data?.createBooking) {
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

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Select Your Room';
            case 2:
                return 'Guest Information';
            case 3:
                return 'Confirm Your Booking';
            default:
                return 'Complete Your Booking';
        }
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case 1:
                return 'Choose the room type that best fits your needs';
            case 2:
                return 'Enter the guest details for this reservation';
            case 3:
                return 'Review all details and confirm your booking';
            default:
                return '';
        }
    };

    return (
        <MainContainer className='pb-10'>
            <div className="my-4">
                <div className="relative flex items-center justify-center mb-2">
                    <Button
                        onClick={() => router.back()}
                        variant="blank"
                        className="absolute left-0 inline-flex items-center gap-2 bg-surface-raised hover:bg-surface border border-border rounded-full px-4 py-2 text-primary transition-all font-medium group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to results
                    </Button>
                    <h1 className="text-3xl font-bold text-primary">{getStepTitle()}</h1>
                </div>
                <p className="text-secondary">{getStepDescription()}</p>
            </div>

            <BookingStepper steps={BOOKING_STEPS} currentStep={currentStep} />

            {/* Step Content */}
            <div className="mb-6">
                {currentStep === 1 && (
                    <RoomSelection
                        basePrice={hotel.pricePerNight}
                        selectedRoom={selectedRoom}
                        onSelectRoom={handleRoomSelect}
                    />
                )}

                {currentStep === 2 && (
                    <GuestForm
                        onSubmit={handleGuestFormSubmit}
                        onFormChange={handleFormChange}
                        defaultEmail={user?.email || ''}
                    />
                )}

                {currentStep === 3 && selectedRoom && guestFormData && (
                    <BookingConfirmation
                        hotel={hotel}
                        selectedRoom={selectedRoom}
                        guestData={guestFormData}
                        startDate={startDate}
                        endDate={endDate}
                        nights={nights}
                    />
                )}
            </div>

            {error && (
                <div className="mb-4 rounded-lg bg-error/20 border border-error p-4">
                    <p className="text-error text-sm font-medium">{error}</p>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
                <Button
                    onClick={handleBack}
                    variant="blank"
                    className="rounded-full flex-1 bg-surface border border-border text-primary hover:bg-surface-raised/80 px-6 py-3 font-medium"
                >
                    {currentStep === 1 ? 'Cancel' : 'Back'}
                </Button>

                {currentStep < 3 ? (
                    <Button
                        onClick={handleNext}
                        variant="secondary"
                        className="flex-1 px-6 py-3 font-medium"
                        disabled={!canProceed()}
                    >
                        <span>Continue</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleConfirmBooking}
                        variant="secondary"
                        className="flex-1 px-6 py-3 font-medium"
                        disabled={!user || isCreatingBooking}
                    >
                        {isCreatingBooking ? 'Creating Booking...' : 'Confirm Booking'}
                    </Button>
                )}
            </div>
        </MainContainer>
    );
}
