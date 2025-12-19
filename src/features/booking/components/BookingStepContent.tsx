'use client';

import type { HotelResponseDto } from '@/types/graphql';
import BookingConfirmation from './BookingConfirmation';

import { GuestFormData } from '../utils';
import GuestForm from './booking/GuestForm';
import RoomSelection, { RoomType } from './RoomSelection';

interface BookingStepContentProps {
    currentStep: number;
    // Step 1 - Room Selection
    hotel: HotelResponseDto;
    selectedRoom: RoomType | null;
    onSelectRoom: (room: RoomType) => void;
    // Step 2 - Guest Form
    onGuestFormSubmit: (data: GuestFormData) => void;
    onFormChange: (data: GuestFormData | null, isValid: boolean) => void;
    defaultEmail: string;
    // Step 3 - Confirmation
    guestData: GuestFormData | null;
    startDate: string;
    endDate: string;
    nights: number;
}

export default function BookingStepContent({
    currentStep,
    hotel,
    selectedRoom,
    onSelectRoom,
    onGuestFormSubmit,
    onFormChange,
    defaultEmail,
    guestData,
    startDate,
    endDate,
    nights,
}: BookingStepContentProps) {
    return (
        <div className="mb-6">
            {currentStep === 1 && (
                <RoomSelection
                    basePrice={hotel.pricePerNight}
                    selectedRoom={selectedRoom}
                    onSelectRoom={onSelectRoom}
                />
            )}

            {currentStep === 2 && (
                <GuestForm
                    onSubmit={onGuestFormSubmit}
                    onFormChange={onFormChange}
                    defaultEmail={defaultEmail}
                />
            )}

            {currentStep === 3 && selectedRoom && guestData && (
                <BookingConfirmation
                    hotel={hotel}
                    selectedRoom={selectedRoom}
                    guestData={guestData}
                    startDate={startDate}
                    endDate={endDate}
                    nights={nights}
                />
            )}
        </div>
    );
}
