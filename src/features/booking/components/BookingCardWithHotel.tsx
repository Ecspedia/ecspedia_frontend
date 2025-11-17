'use client';

import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import type { Booking, HotelByIdQuery } from '@/types/graphql';
import { HOTEL_BY_ID_QUERY } from '@/features/booking/api/bookings.queries';
import BookingHotelCard from '@/features/booking/components/BookingHotelCard';
import { Button, Spinner } from '@/components/ui';

interface BookingCardWithHotelProps {
    booking: Booking;
    isPaid?: boolean;
}

function BookingCardWithHotel({ booking, isPaid = false }: BookingCardWithHotelProps) {
    const [isPaying, setIsPaying] = useState(false);
    const { data: hotelData, loading: hotelLoading } = useQuery<HotelByIdQuery>(
        HOTEL_BY_ID_QUERY,
        {
            variables: { id: booking.hotelId },
            skip: !booking.hotelId,
        }
    );

    const paymentStatus = (booking as any).paymentStatus || (booking as any).payment_status || 'pending';

    async function handlePay() {
        try {
            setIsPaying(true);
            const amountCents = Math.round((booking.price || 0) * 100);
            const resp = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId: booking.id, amount: amountCents, currency: booking.currency || 'USD' }),
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

    return (
        <div className="bg-surface rounded-lg border border-border p-6 hover:bg-surface-raised/80 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                        Booking #{booking.id.slice(0, 8)}
                    </h3>
                    <p className="text-secondary">
                        Guest: {booking.firstNameGuest} {booking.lastNameGuest}
                    </p>
                    <p className="text-secondary">Email: {booking.emailGuest}</p>
                    {booking.phoneNumberGuest && (
                        <p className="text-secondary">Phone: {booking.phoneNumberGuest}</p>
                    )}
                </div>
                <div className="text-right">
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${isPaid
                            ? 'bg-success/20 text-success'
                            : booking.status === 'CANCELED'
                                ? 'bg-alert/20 text-alert'
                                : 'bg-warning/20 text-warning'
                            }`}
                    >
                        {isPaid ? "PAID" : "PENDING"}
                    </span>
                </div>
            </div>

            {hotelLoading ? (
                <div className="flex items-center justify-center py-4">
                    <Spinner size="sm" />
                </div>
            ) : hotelData?.hotelById ? (
                <div className="mb-4 pb-4 border-b border-border">
                    <BookingHotelCard hotel={hotelData.hotelById} />


                </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-secondary mb-1">Check-in</p>
                    <p className="text-primary">
                        {new Date(booking.startTime).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-secondary mb-1">Check-out</p>
                    <p className="text-primary">
                        {new Date(booking.endTime).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
            </div>

            {booking.price && (
                <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div>
                        <span className="text-secondary">Total Price</span>
                        <div className="text-xl font-bold text-primary">
                            {booking.currency || 'USD'} {booking.price.toLocaleString()}
                        </div>
                    </div>

                    <div>
                        {paymentStatus === 'paid' || isPaid ? (
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-success/20 text-success">Paid</span>
                        ) : (
                            <Button
                                onClick={handlePay}
                                variant="success"
                                className="inline-flex items-center px-4 py-2 rounded"
                            >
                                {isPaying ? 'Redirecting...' : 'Pay'}
                            </Button>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-4 text-sm text-secondary">
                <p>Created: {new Date(booking.createdAt).toLocaleDateString()}</p>
                {booking.confirmedAt && (
                    <p>Confirmed: {new Date(booking.confirmedAt).toLocaleDateString()}</p>
                )}
                {booking.canceledAt && (
                    <p>Canceled: {new Date(booking.canceledAt).toLocaleDateString()}</p>
                )}
            </div>
        </div>
    );
}

export default BookingCardWithHotel;
