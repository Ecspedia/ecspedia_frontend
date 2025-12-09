'use client';

import { Button } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { clearSelectedHotel, selectSelectedHotel, setSelectedHotel } from '@/stores/globalSlice';
import { cn } from '@/utils/utils';
import { CalendarCheck, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useHotelCardContext } from '../hooks/useHotelCardContext';


const ButtonWidth = 30

// HotelCardBookButton - Book now button
interface HotelCardBookButtonProps {
  onBook?: () => void;
  className?: string;
}

export function HotelCardBookButton({ onBook, className }: HotelCardBookButtonProps) {
  const { hotel } = useHotelCardContext();
  const router = useRouter();
  const isAvailable = hotel.isAvailable ?? true;

  const handleBookClick = () => {
    if (onBook) {
      onBook();
    } else {
      // Save hotel data to localStorage
      localStorage.setItem('selectedHotel', JSON.stringify(hotel));
      // Navigate to booking page
      router.push(`/booking?hotelId=${hotel.id}`);
    }
  };

  return (
    <Button

      onClick={handleBookClick}
      disabled={!isAvailable}
      className={cn("w-full p-2", className)}
    >
      <Button.Icon icon={CalendarCheck} />
      {isAvailable ? 'Book Now' : 'Not Available'}

    </Button>
  );
}




interface HotelCardAskButtonProps {

  className?: string;
}

export function HotelCardAskButton({
  className
}: HotelCardAskButtonProps) {
  const { hotel } = useHotelCardContext();
  const dispatch = useAppDispatch();
  const selectedHotel = useAppSelector(selectSelectedHotel);
  const isSelected = selectedHotel?.id === hotel.id;

  const handleAskClick = () => {
    if (isSelected) {
      dispatch(clearSelectedHotel());
    } else {
      dispatch(setSelectedHotel(hotel));
    }
  };

  return (
    <Button
      variant={isSelected ? 'primary' : 'secondary'}
      onClick={handleAskClick}
      className={cn(
        'w-30 p-2 bg-surface text-primary  hover:bg-brand-primary/10 ring-border ring-2 dark:ring-0 dark:bg-overlay dark:border-border dark:border',
        isSelected && 'bg-brand-primary text-white dark:bg-[#C8961E] shadow-lg hover:bg-brand-primary',
        className
      )}
    >
      <Button.Icon icon={isSelected ? Sparkles : MessageCircleQuestion} />
      {isSelected ? 'Selected' : 'Ask AI'}
    </Button>
  );
}