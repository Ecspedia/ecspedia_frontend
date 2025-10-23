import HotelCard from './HotelCard';
import { Hotel } from '@/types/hotel';

interface HotelCardListProps {
  hotels: Hotel[];
}

export default function HotelCardList(hotelCardListProps: HotelCardListProps) {
  const { hotels } = hotelCardListProps;
  return (
    <div className="flex flex-col gap-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
