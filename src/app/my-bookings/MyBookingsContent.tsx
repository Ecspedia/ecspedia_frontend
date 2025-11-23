"use client";

import { Button, MainContainer, Spinner } from '@/components/ui';
import { BOOKINGS_BY_USER_EMAIL_QUERY } from '@/features/booking/api/bookings.queries';
import BookingCardWithHotel from '@/features/booking/components/BookingCardWithHotel';
import { useCurrentUser } from '@/hooks';
import type { BookingsByUserEmailQuery } from '@/types/graphql';
import { useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyBookingsContent() {
  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { data, loading, error } = useQuery<BookingsByUserEmailQuery>(
    BOOKINGS_BY_USER_EMAIL_QUERY,
    {
      variables: { email: user?.email || '' },
      skip: !user?.email,
      fetchPolicy: 'network-only', // Always fetch fresh data from the server
    }
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const [paidBookingId, setPaidBookingId] = useState<string | null>(null);

  useEffect(() => {
    const paid = searchParams.get('paid');
    if (paid) {
      setPaidBookingId(paid);
      // Clean up URL by removing the paid param
      router.replace('/my-bookings');
    }
  }, [searchParams, router]);

  if (isLoadingUser || loading) {
    return (
      <MainContainer className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </MainContainer>
    );
  }

  if (!user) {
    return (
      <MainContainer className='pt-8'>
        <h1 className="text-3xl font-bold text-primary mb-4">My Bookings</h1>
        <div className="bg-surface rounded-lg border border-border p-8 text-center flex-col justify-center">
          <p className="text-secondary text-lg">Please log in to view your bookings</p>
          <div className='flex justify-center pt-2'>
            <Button
              type="button"
              onClick={() => router.push('/login')}

              className="py-2 px-4"
            >
              Log In
            </Button>
          </div>
        </div>

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
            <BookingCardWithHotel key={booking.id} booking={booking} isPaid={paidBookingId === booking.id} />
          ))}
        </div>
      )}
    </MainContainer>
  );
}
