import { Button } from '@/components/ui';
import { cn } from '@/utils/utils';
import { ArrowRight, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useHotelCardContext } from '../hooks/useHotelCardContext';

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
      variant="secondary"
      onClick={handleBookClick}
      disabled={!isAvailable}
      className={cn("w-full p-2", className)}
    >

      {isAvailable ? 'Book Now' : 'Not Available'}
      <Button.Icon icon={ArrowRight} />
    </Button>
  );
}

// HotelCardDetailsButton - View details button
export function HotelCardDetailsButton() {
  return (
    <Button variant="primary" className="p-2">
      <Button.Icon icon={Eye} />
      View Details
    </Button>
  );
}

