'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Hotel } from '@/types/api';
import { BookingForm, BookingLoading, BookingNotFound, GuestFormData } from '@/features/booking/components';

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);

    // Get hotel ID from URL params
    const hotelId = searchParams.get('hotelId');

    useEffect(() => {
        if (!hotelId) {
            // If no hotel ID, redirect back
            router.push('/search-hotels');
            return;
        }

        // TODO: Fetch hotel data by ID
        // For now, we'll get it from localStorage or state
        const hotelData = localStorage.getItem('selectedHotel');
        if (hotelData) {
            setHotel(JSON.parse(hotelData));
        }
        setLoading(false);
    }, [hotelId, router]);

    const handleGuestFormSubmit = (data: GuestFormData) => {
        // TODO: Handle booking confirmation with guest data
        void data;
    };

    const handleConfirmBooking = () => {
        // TODO: Process booking
        void hotel;
    };

    if (loading) {
        return <BookingLoading />;
    }

    if (!hotel) {
        return <BookingNotFound />;
    }

    return (
        <BookingForm
            hotel={hotel}
            onGuestFormSubmit={handleGuestFormSubmit}
            onConfirmBooking={handleConfirmBooking}
        />
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<BookingLoading />}>
            <BookingContent />
        </Suspense>
    );
}
