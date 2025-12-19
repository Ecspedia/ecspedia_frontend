'use client';

import HotelCard from '@/components/shared/HotelCard';
import { Button, ConfirmDialog } from '@/components/ui';
import { useIsMobile } from '@/hooks';
import type { HotelResponseDto } from '@/types/graphql';
import { CalendarDays, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { BookingGuestInfo } from '../guestInfo';
import { useBookingCardContext } from '../hooks';
import { BookingStayDetails } from '../stayDetails';
import { getRoomTypeBadgeColor } from '../utils';

interface MyBookingsCardVariantProps {
  hotel?: HotelResponseDto | null;
  onDelete?: () => void;
  onPay?: () => void;
  isPaying?: boolean;
  isDeleting?: boolean;
}

export function MyBookingsCardVariant({
  hotel,
  onDelete,
  onPay,
  isPaying = false,
  isDeleting = false,
}: MyBookingsCardVariantProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.();
    setShowConfirmDelete(false);
  };

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden hover:border-border/80 transition-all shadow-sm">
      <BookingCardHeader onDeleteClick={handleDeleteClick} />

      <div className="p-6">
        <BookingCardHotelPreview hotel={hotel} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingStayDetails />
          <BookingGuestInfo showEmail />
        </div>

        <BookingCardFooter
          onPayClick={onPay}
          isPaying={isPaying}
        />
      </div>

      <ConfirmDialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Booking"
        message="Are you sure you want to remove this booking? This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}

/* ============================================
   BOOKING CARD HEADER (MyBookings specific)
   ============================================ */

function BookingCardHeader({ onDeleteClick }: { onDeleteClick: () => void }) {
  const { booking, isPaid } = useBookingCardContext();
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
              Booking #{booking.id.slice(0, 8)}
            </h3>
            <div className="flex items-center gap-2 text-xs text-secondary">
              <Clock className="w-3 h-3" />
              <span>Created {new Date(booking.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          {isMobile && (
            <Button
              onClick={onDeleteClick}
              variant="blank"
              className="w-6 h-6 self-center ml-auto p-2 text-secondary hover:text-error hover:bg-error/10 rounded-full transition-colors"
            >
              <Trash2 />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoomTypeBadgeColor(booking.roomType)}`}
          >
            {booking.roomType}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isPaid
                ? 'bg-success/20 text-success'
                : booking.status === 'CANCELED'
                  ? 'bg-alert/20 text-alert'
                  : 'bg-warning/20 text-warning'
            }`}
          >
            {isPaid ? 'PAID' : booking.status}
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

function BookingCardHotelPreview({ hotel }: { hotel?: HotelResponseDto | null }) {
  if (!hotel) {
    return null;
  }

  return (
    <div className="mb-6">
      <HotelCard hotel={hotel} variant="booking-compact" />
    </div>
  );
}

/* ============================================
   BOOKING CARD FOOTER
   ============================================ */

function BookingCardFooter({
  onPayClick,
  isPaying,
}: {
  onPayClick?: () => void;
  isPaying?: boolean;
}) {
  const { booking, isPaid } = useBookingCardContext();

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
      <div>
        <p className="text-xs text-secondary mb-1">Total Price</p>
        <p className="text-2xl font-bold text-primary">
          <span className="text-sm font-normal text-secondary mr-1">
            {booking.currency || 'USD'}
          </span>
          {(booking.price || 100).toLocaleString()}
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
