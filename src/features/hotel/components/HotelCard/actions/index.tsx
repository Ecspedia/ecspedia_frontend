import { Button } from '@/components/ui';
import { useHotelCardContext } from '../../../hooks';

// HotelCardBookButton - Book now button
interface HotelCardBookButtonProps {
  onBook?: () => void;
}

export function HotelCardBookButton({ onBook }: HotelCardBookButtonProps) {
  const { hotel } = useHotelCardContext();
  const isAvailable = hotel.isAvailable ?? true;

  return (
    <Button
      variant="secondary"
      text={isAvailable ? 'Book Now' : 'Not Available'}
      onClick={onBook ? onBook : () => { }}
      disabled={!isAvailable}
      className="w-full p-2"
    />
  );
}

// HotelCardDetailsButton - View details button
export function HotelCardDetailsButton() {
  return <Button variant="primary" text={'View Details'} className="p-2"></Button>;
}

