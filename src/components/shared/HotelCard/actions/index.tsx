import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useHotelCardContext } from '../hooks/useHotelCardContext';

// HotelCardBookButton - Book now button
interface HotelCardBookButtonProps {
  onBook?: () => void;
}

export function HotelCardBookButton({ onBook }: HotelCardBookButtonProps) {
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
      text={isAvailable ? 'Book Now' : 'Not Available'}
      onClick={handleBookClick}
      disabled={!isAvailable}
      className="w-full p-2"
    />
  );
}

// HotelCardDetailsButton - View details button
export function HotelCardDetailsButton() {
  return <Button variant="primary" text={'View Details'} className="p-2"></Button>;
}

