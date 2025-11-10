'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Hotel } from '@/types/api';
import BookingDetails from './BookingDetails';
import PaymentSummary from './PaymentSummary';
import GuestForm, { GuestFormData } from './GuestForm';
import { ArrowLeft } from 'lucide-react';

interface BookingFormProps {
    hotel: Hotel;
    onGuestFormSubmit: (data: GuestFormData) => void;
    onConfirmBooking: () => void;
}

export default function BookingForm({ hotel, onGuestFormSubmit, onConfirmBooking }: BookingFormProps) {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
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
                <GuestForm onSubmit={onGuestFormSubmit} />
                <PaymentSummary hotel={hotel} nights={1} />
                <div className="flex gap-4">
                    <Button
                        onClick={() => router.back()}
                        variant="blank"
                        className="flex-1 bg-surface border border-border text-primary hover:bg-surface-raised/80 px-6 py-3 font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirmBooking}
                        variant="secondary"
                        className="flex-1 px-6 py-3 font-medium"
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </div>
    );
}
