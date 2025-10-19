import { Heart } from 'lucide-react';
import { useHotelCardContext } from './utils';
import Image from 'next/image';

export default function HotelCardImage() {
  const { hotel } = useHotelCardContext();
  return (
    <div className="group relative h-48 w-64 flex-shrink-0 overflow-hidden rounded-lg">
      <Image
        src={hotel.image || '/images/home/hotel_mock.avif'}
        alt={hotel.name}
        fill
        className="object-cover"
      />
      <button className="absolute top-3 right-3 rounded-full bg-white p-2 transition-transform hover:scale-110">
        <Heart className="text-primary/60 h-5 w-5" />
      </button>
    </div>
  );
}
