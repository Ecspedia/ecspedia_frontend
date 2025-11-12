'use client';

import { useQuery } from '@apollo/client/react';
import { Booking, HotelByIdData } from '@/types/api';
import { HOTEL_BY_ID_QUERY } from '@/features/booking/api/bookings.queries';
import BookingHotelCard from '@/features/booking/components/BookingHotelCard';
import { Spinner } from '@/components/ui';

interface BookingCardWithHotelProps {
    booking: Booking;
}

function BookingCardWithHotel({ booking }: BookingCardWithHotelProps) {
    const { data: hotelData, loading: hotelLoading } = useQuery<HotelByIdData>(
        HOTEL_BY_ID_QUERY,
        {
            variables: { id: booking.hotelId },
            skip: !booking.hotelId,
        }
    );

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
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'CONFIRMED'
                            ? 'bg-green-500/20 text-green-500'
                            : booking.status === 'CANCELED'
                                ? 'bg-red-500/20 text-red-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                    >
                        {booking.status}
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
                    <span className="text-secondary">Total Price</span>
                    <span className="text-xl font-bold text-primary">
                        {booking.currency || 'USD'} {booking.price.toLocaleString()}
                    </span>
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

