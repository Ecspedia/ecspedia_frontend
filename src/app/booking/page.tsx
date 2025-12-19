'use client';

import { BookingForm, BookingLoading, BookingNotFound } from '@/features/booking/components';
import { useAppSelector, useCurrentUser } from '@/hooks';
import { selectSelectedHotelForBooking } from '@/stores/globalSlice';
import type { HotelResponseDto } from '@/types/graphql';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function BookingContent() {

    const router = useRouter();
    const [hotel, setHotel] = useState<HotelResponseDto | null>(null);
    const [loading, setLoading] = useState(true);
    const selectedHotelForBook = useAppSelector(selectSelectedHotelForBooking)
    const { isAuthenticated, isLoading: isLoadingUser } = useCurrentUser();

    //global state
    const hotelId = selectedHotelForBook?.id;

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoadingUser && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoadingUser, router]);

    useEffect(() => {
        if (!hotelId) {
            router.push('/');
            return;
        }
        setHotel(selectedHotelForBook);
        setLoading(false);
    }, [hotelId, router, selectedHotelForBook]);

    if (isLoadingUser) {
        return <BookingLoading />;
    }

    if (!isAuthenticated) {
        return <BookingLoading />;
    }


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
