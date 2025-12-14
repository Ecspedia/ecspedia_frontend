'use client';

import { BookingForm, BookingLoading, BookingNotFound } from '@/features/booking/components';
import { useAppSelector } from '@/hooks';
import { selectSelectedHotelForBooking } from '@/stores/globalSlice';
import type { HotelResponseDto } from '@/types/graphql';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function BookingContent() {

    const router = useRouter();
    const [hotel, setHotel] = useState<HotelResponseDto | null>(null);
    const [loading, setLoading] = useState(true);
    const selectedHotelForBook = useAppSelector(selectSelectedHotelForBooking)


    //global state
    const hotelId = selectedHotelForBook?.id;

    useEffect(() => {
        if (!hotelId) {
            router.push('/');
            return;
        }
        setHotel(selectedHotelForBook);
        setLoading(false);
    }, [hotelId, router, selectedHotelForBook]);


    if (loading) {
        return <BookingLoading />;
    }

    if (!hotel) {
        return <BookingNotFound />;
    }

    return (
        <BookingForm
            hotel={hotel}
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
