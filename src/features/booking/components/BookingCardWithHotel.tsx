'use client';

import HotelCard from '@/components/shared/HotelCard';
import { Button, ConfirmDialog, Spinner } from '@/components/ui';
import { BOOKINGS_BY_USER_EMAIL_QUERY, HOTEL_BY_ID_QUERY } from '@/features/booking/api/bookings.queries';
import { DELETE_BOOKING_MUTATION } from '@/features/booking/api/bookings.mutations';
import type { Booking, HotelByIdQuery } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCurrentUser } from '@/hooks';

interface BookingCardWithHotelProps {
    booking: Booking;
    isPaid?: boolean;
}

function BookingCardWithHotel({ booking, isPaid = false }: BookingCardWithHotelProps) {
    const { user } = useCurrentUser();
    const [isPaying, setIsPaying] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const { data: hotelData, loading: hotelLoading } = useQuery<HotelByIdQuery>(
        HOTEL_BY_ID_QUERY,
        {
            variables: { id: booking.hotelId },
            skip: !booking.hotelId,
        }
    );
    const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
        refetchQueries: [
            {
                query: BOOKINGS_BY_USER_EMAIL_QUERY,
                variables: { email: user?.email || '' },
            },
        ],
    });

    const bookingWithPayment = booking as Booking & { paymentStatus?: string; payment_status?: string };
    const paymentStatus = bookingWithPayment.paymentStatus || bookingWithPayment.payment_status || 'pending';

    async function handlePay() {
        try {
            setIsPaying(true);
            const amountCents = Math.round((booking.price || 100) * 100);
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

    async function handleRemove() {
        setIsRemoving(true);
        try {
            await deleteBooking({ variables: { bookingId: booking.id } });
        } catch (err) {
            console.error('Failed to delete booking:', err);
        } finally {
            setIsRemoving(false);
            setShowConfirmDelete(false);
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
                <div className="flex items-center gap-2">
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
                    <Button
                        onClick={() => setShowConfirmDelete(true)}
                        variant="blank"
                        className="p-2 text-secondary hover:text-error hover:bg-error/10 rounded-full transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {hotelLoading ? (
                <div className="flex items-center justify-center py-4">
                    <Spinner size="sm" />
                </div>
            ) : hotelData?.hotelById ? (
                <div className="mb-4 pb-4 border-b border-border">
                    <HotelCard hotel={hotelData.hotelById} variant="booking-compact" />


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

            <div className="flex justify-between items-center pt-4 border-t border-border">
                <div>
                    <span className="text-secondary">Total Price</span>
                    <div className="text-xl font-bold text-primary">
                        {booking.currency || 'USD'} {(booking.price || 100).toLocaleString()}
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

            <div className="mt-4 text-sm text-secondary">
                <p>Created: {new Date(booking.createdAt).toLocaleDateString()}</p>
                {booking.confirmedAt && (
                    <p>Confirmed: {new Date(booking.confirmedAt).toLocaleDateString()}</p>
                )}
                {booking.canceledAt && (
                    <p>Canceled: {new Date(booking.canceledAt).toLocaleDateString()}</p>
                )}
            </div>

            <ConfirmDialog
                isOpen={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={handleRemove}
                title="Remove Booking"
                message="Are you sure you want to remove this booking? This action cannot be undone."
                confirmText="Remove"
                cancelText="Cancel"
                isLoading={isRemoving}
                variant="danger"
            />
        </div>
    );
}

export default BookingCardWithHotel;
