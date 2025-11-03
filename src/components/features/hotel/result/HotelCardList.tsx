'use client';

import { useRouter } from 'next/navigation';
import HotelCard from './HotelCard';
import { Hotel } from '@/types/hotel';
import { BookingDates } from '@/types/booking';

interface HotelCardListProps {
  hotels: Hotel[];
}

export default function HotelCardList(hotelCardListProps: HotelCardListProps) {
  const { hotels } = hotelCardListProps;
  const router = useRouter();

  const handleBookClick = (hotel: Hotel) => {
    // Calculate booking dates (default: today to tomorrow)
    const checkIn = new Date();
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 1);

    const bookingDates: BookingDates = {
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      nights: 1,
    };

    // Navigate to booking page with hotel and dates data
    const hotelParam = encodeURIComponent(JSON.stringify(hotel));
    const datesParam = encodeURIComponent(JSON.stringify(bookingDates));
    router.push(`/booking?hotel=${hotelParam}&dates=${datesParam}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onBookClick={() => handleBookClick(hotel)}
        />
      ))}
    </div>
  );
}
