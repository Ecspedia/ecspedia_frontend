'use client';

import { MainContainer } from '@/components/ui';
import { useCurrentUser } from '@/hooks';
import { RoomType as RoomTypeBackEnd, type CreateBookingMutation, type HotelResponseDto } from '@/types/graphql';

import { useMutation } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import BookingError from './BookingError';
import BookingHeader from './BookingHeader';
import BookingNavigation from './BookingNavigation';
import BookingStepContent from './BookingStepContent';
import BookingStepper, { BOOKING_STEPS } from './BookingStepper';
import { GuestFormData } from './GuestForm';
import { RoomType } from './RoomSelection';

import { BOOKINGS_BY_USER_EMAIL_QUERY } from '@/features/booking/api/bookings.queries';
import { DateHelper } from '@/utils/dateHelpers';
import { CREATE_BOOKING_MUTATION } from '../../api/bookings.mutations';

interface BookingFormProps {
    hotel: HotelResponseDto
}

export default function BookingForm({ hotel }: BookingFormProps) {
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
            startTime.setHours(0, 0, 0, 0);

            const endTime = new Date(endDateObj);
            endTime.setHours(0, 0, 0, 0);

            const roomPrice = Math.round(hotel.pricePerNight);

            // Map frontend room id to backend RoomType enum
            const roomTypeMap: Record<string, RoomTypeBackEnd> = {
                standard: RoomTypeBackEnd.Standard,
                deluxe: RoomTypeBackEnd.Deluxe,
                suite: RoomTypeBackEnd.Suite,
            };
            const backendRoomType = roomTypeMap[selectedRoom.id];

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
                        roomType: backendRoomType,
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
            <BookingHeader
                title={getStepTitle()}
                description={getStepDescription()}
                onBack={() => router.back()}
            />

            <BookingStepper steps={BOOKING_STEPS} currentStep={currentStep} />

            <BookingStepContent
                currentStep={currentStep}
                hotel={hotel}
                selectedRoom={selectedRoom}
                onSelectRoom={handleRoomSelect}
                onGuestFormSubmit={handleGuestFormSubmit}
                onFormChange={handleFormChange}
                defaultEmail={user?.email || ''}
                guestData={guestFormData}
                startDate={startDate}
                endDate={endDate}
                nights={nights}
            />

            <BookingError error={error} />

            <BookingNavigation
                currentStep={currentStep}
                canProceed={canProceed()}
                isCreatingBooking={isCreatingBooking}
                hasUser={!!user}
                onBack={handleBack}
                onNext={handleNext}
                onConfirm={handleConfirmBooking}
            />
        </MainContainer>
    );
}
