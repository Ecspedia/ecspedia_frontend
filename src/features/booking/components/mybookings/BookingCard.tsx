'use client';

import { BookingCard as SharedBookingCard } from '@/components/shared/BookingCard';
import { DELETE_BOOKING_MUTATION } from '@/features/booking/api/bookings.mutations';
import { BOOKINGS_BY_USER_EMAIL_QUERY, HOTEL_BY_ID_QUERY } from '@/features/booking/api/bookings.queries';
import { useCurrentUser } from '@/hooks';
import type { BookingResponseDto, HotelByIdQuery } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';

interface BookingCardProps {
    booking: BookingResponseDto;
    isPaid?: boolean;
}

function BookingCard({ booking, isPaid = false }: BookingCardProps) {
    const { user } = useCurrentUser();
    const [isPaying, setIsPaying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch hotel data for preview
    const { data: hotelData } = useQuery<HotelByIdQuery>(HOTEL_BY_ID_QUERY, {
        variables: { id: booking.hotelId },
        skip: !booking.hotelId,
    });

    const hotel = hotelData?.hotelById;

    const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
        refetchQueries: [
            {
                query: BOOKINGS_BY_USER_EMAIL_QUERY,
                variables: { email: user?.email || '' },
            },
        ],
    });

    const bookingWithPayment = booking as BookingResponseDto & {
        paymentStatus?: string;
        payment_status?: string;
    };
    const paymentStatus =
        bookingWithPayment.paymentStatus || bookingWithPayment.payment_status || 'pending';
    const isPaymentComplete = paymentStatus === 'paid' || isPaid;

    async function handlePay() {
        try {
            setIsPaying(true);
            const amountCents = Math.round((booking.price || 100) * 100);
            const resp = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: booking.id,
                    amount: amountCents,
                    currency: booking.currency || 'USD',
                }),
            });

            const json = await resp.json();
            if (json.url) {
                window.location.href = json.url;
            } else {
                console.error('No url from checkout session', json);
                setIsPaying(false);
            }
        } catch (err) {
            console.error(err);
            setIsPaying(false);
        }
    }

    async function handleDelete() {
        setIsDeleting(true);
        try {
            await deleteBooking({ variables: { bookingId: booking.id } });
        } catch (err) {
            console.error('Failed to delete booking:', err);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <SharedBookingCard
            booking={booking}
            variant="default"
            isPaid={isPaymentComplete}
            hotel={hotel}
            hotelName={hotel?.name}
            onPay={handlePay}
            onDelete={handleDelete}
            isPaying={isPaying}
            isDeleting={isDeleting}
        />
    );
}

export default BookingCard;
