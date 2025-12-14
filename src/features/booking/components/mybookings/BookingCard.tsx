'use client';

import HotelCard from '@/components/shared/HotelCard';
import { Button, ConfirmDialog, Spinner } from '@/components/ui';
import { DELETE_BOOKING_MUTATION } from '@/features/booking/api/bookings.mutations';
import { BOOKINGS_BY_USER_EMAIL_QUERY, HOTEL_BY_ID_QUERY } from '@/features/booking/api/bookings.queries';
import { useCurrentUser, useIsMobile } from '@/hooks';
import type { BookingResponseDto, HotelByIdQuery } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client/react';
import { CalendarDays, Clock, Mail, Phone, Trash2, User } from 'lucide-react';
import { useState } from 'react';

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

const getRoomTypeBadgeColor = (roomType: string) => {
    switch (roomType) {
        case 'SUITE':
            return 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30';
        case 'DELUXE':
            return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30';
        default:
            return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30';
    }
};

/* ============================================
   BOOKING CARD HEADER
   ============================================ */

interface BookingCardHeaderProps {
    bookingId: string;
    createdAt: string;
    roomType: string;
    status: string;
    isPaid: boolean;
    onDeleteClick: () => void;
}

function BookingCardHeader({
    bookingId,
    createdAt,
    roomType,
    status,
    isPaid,
    onDeleteClick,
}: BookingCardHeaderProps) {
    const isMobile = useIsMobile();
    return (
        <div className="bg-surface-raised dark:bg-surface px-6 py-4 border-b border-border">
            <div className="flex flex-col gap-2 lg:flex lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                        <CalendarDays className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary">
                            Booking #{bookingId.slice(0, 8)}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-secondary">
                            <Clock className="w-3 h-3" />
                            <span>Created {new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    {isMobile &&
                        <Button
                            onClick={onDeleteClick}
                            variant="blank"
                            className="w-6 h-6 self-center ml-auto p-2 text-secondary hover:text-error hover:bg-error/10 rounded-full transition-colors"
                        >
                            <Trash2 className="" />
                        </Button>
                    }
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoomTypeBadgeColor(roomType)}`}
                    >
                        {roomType}
                    </span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${isPaid
                            ? 'bg-success/20 text-success'
                            : status === 'CANCELED'
                                ? 'bg-alert/20 text-alert'
                                : 'bg-warning/20 text-warning'
                            }`}
                    >
                        {isPaid ? 'PAID' : status}
                    </span>
                    <Button
                        onClick={onDeleteClick}
                        variant="blank"
                        className="hidden lg:block p-2 text-secondary hover:text-error hover:bg-error/10 rounded-full transition-colors"
                    >
                        <Trash2 className="lg:w-5 lg:h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

/* ============================================
   BOOKING CARD HOTEL PREVIEW
   ============================================ */

interface BookingCardHotelPreviewProps {
    hotelId: string;
}

function BookingCardHotelPreview({ hotelId }: BookingCardHotelPreviewProps) {
    const { data: hotelData, loading: hotelLoading } = useQuery<HotelByIdQuery>(HOTEL_BY_ID_QUERY, {
        variables: { id: hotelId },
        skip: !hotelId,
    });

    if (hotelLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Spinner size="sm" />
            </div>
        );
    }

    if (!hotelData?.hotelById) {
        return null;
    }

    return (
        <div className="mb-6">
            <HotelCard hotel={hotelData.hotelById} variant="booking-compact" />
        </div>
    );
}

/* ============================================
   BOOKING CARD STAY DETAILS
   ============================================ */

interface BookingCardStayDetailsProps {
    checkIn: string;
    checkOut: string;
}

function BookingCardStayDetails({ checkIn, checkOut }: BookingCardStayDetailsProps) {
    return (
        <div className="bg-muted dark:bg-overlay rounded-lg p-4">
            <h4 className="text-sm font-medium text-secondary mb-3 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Stay Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-secondary mb-1">Check-in</p>
                    <p className="text-sm font-medium text-primary">
                        {formatDate(checkIn)}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-secondary mb-1">Check-out</p>
                    <p className="text-sm font-medium text-primary">
                        {formatDate(checkOut)}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ============================================
   BOOKING CARD GUEST INFO
   ============================================ */

interface BookingCardGuestInfoProps {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
}

function BookingCardGuestInfo({ firstName, lastName, email, phone }: BookingCardGuestInfoProps) {
    return (
        <div className="bg-muted dark:bg-overlay rounded-lg p-4">
            <h4 className="text-sm font-medium text-secondary mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Guest Information
            </h4>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <User className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-primary">
                        {firstName} {lastName}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-primary">{email}</span>
                </div>
                {phone && (
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-primary">{phone}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ============================================
   BOOKING CARD FOOTER
   ============================================ */

interface BookingCardFooterProps {
    price: number;
    currency: string;
    isPaid: boolean;
    isPaying: boolean;
    onPayClick: () => void;
}

function BookingCardFooter({ price, currency, isPaid, isPaying, onPayClick }: BookingCardFooterProps) {
    return (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
            <div>
                <p className="text-xs text-secondary mb-1">Total Price</p>
                <p className="text-2xl font-bold text-primary">
                    <span className="text-sm font-normal text-secondary mr-1">
                        {currency}
                    </span>
                    {price.toLocaleString()}
                </p>
            </div>

            {isPaid ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm font-medium text-success">Payment Complete</span>
                </div>
            ) : (
                <Button
                    onClick={onPayClick}
                    variant="success"
                    className="px-6 py-2.5 rounded-lg font-medium"
                >
                    {isPaying ? 'Redirecting...' : 'Pay Now'}
                </Button>
            )}
        </div>
    );
}

/* ============================================
   MAIN BOOKING CARD COMPONENT
   ============================================ */

interface BookingCardProps {
    booking: BookingResponseDto;
    isPaid?: boolean;
}

function BookingCard({ booking, isPaid = false }: BookingCardProps) {
    const { user } = useCurrentUser();
    const [isPaying, setIsPaying] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
        <div className="bg-surface rounded-xl border border-border overflow-hidden hover:border-border/80 transition-all shadow-sm">
            <BookingCardHeader
                bookingId={booking.id}
                createdAt={booking.createdAt}
                roomType={booking.roomType}
                status={booking.status}
                isPaid={isPaymentComplete}
                onDeleteClick={() => setShowConfirmDelete(true)}
            />

            <div className="p-6">
                <BookingCardHotelPreview hotelId={booking.hotelId} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BookingCardStayDetails checkIn={booking.startTime} checkOut={booking.endTime} />

                    <BookingCardGuestInfo
                        firstName={booking.firstNameGuest}
                        lastName={booking.lastNameGuest}
                        email={booking.emailGuest}
                        phone={booking.phoneNumberGuest}
                    />
                </div>

                <BookingCardFooter
                    price={booking.price || 100}
                    currency={booking.currency || 'USD'}
                    isPaid={isPaymentComplete}
                    isPaying={isPaying}
                    onPayClick={handlePay}
                />
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

export default BookingCard;
