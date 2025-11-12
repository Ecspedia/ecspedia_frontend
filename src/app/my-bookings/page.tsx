'use client';

import { useQuery } from '@apollo/client/react';
import { MainContainer, Spinner } from '@/components/ui';
import { useCurrentUser } from '@/hooks';
import { BOOKINGS_BY_USER_EMAIL_QUERY } from '@/features/booking/api/bookings.queries';
import { BookingsByUserEmailData } from '@/types/api';
import BookingCardWithHotel from '@/features/booking/components/BookingCardWithHotel';


export default function MyBookingsPage() {
    const { user, isLoading: isLoadingUser } = useCurrentUser();
    const { data, loading, error } = useQuery<BookingsByUserEmailData>(
        BOOKINGS_BY_USER_EMAIL_QUERY,
        {
            variables: { email: user?.email || '' },
            skip: !user?.email,
            fetchPolicy: 'network-only', // Always fetch fresh data from the server
        }
    );

    if (isLoadingUser || loading) {
        return (
            <MainContainer className="flex items-center justify-center min-h-[400px]">
                <Spinner />
            </MainContainer>
        );
    }

    if (!user) {
        return (
            <MainContainer>
                <h1 className="text-3xl font-bold text-primary mb-4">My Bookings</h1>
                <p className="text-secondary">Please log in to view your bookings.</p>
            </MainContainer>
        );
    }

    if (error) {
        return (
            <MainContainer>
                <h1 className="text-3xl font-bold text-primary mb-4">My Bookings</h1>
                <p className="text-secondary">Error loading bookings: {error.message}</p>
            </MainContainer>
        );
    }

    const bookings = data?.bookingsByUserEmail || [];

    return (
        <MainContainer>
            <h1 className="text-3xl font-bold text-primary mb-6 mt-4">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="bg-surface rounded-lg border border-border p-8 text-center">
                    <p className="text-secondary text-lg">You don&apos;t have any bookings yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <BookingCardWithHotel key={booking.id} booking={booking} />
                    ))}
                </div>
            )}
        </MainContainer>
    );
}

