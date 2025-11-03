import { Hotel } from '@/types/hotel';
import { useRouter } from 'next/navigation';
import HotelCard from '../result/HotelCard';
import { HotelCardContext } from '../result/utils';
import { BookingDates } from '@/types/booking';

interface HotelDetailCardProps {
  hotel: Hotel;
  onClose: () => void;
}

export default function HotelDetailCard({ hotel, onClose }: HotelDetailCardProps) {
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
    <div className="border-border bg-background text-primary fixed right-0 bottom-0 left-0 z-1000 mx-auto w-2/5 min-w-[500px] rounded-lg border shadow-2xl">
      <HotelCardContext.Provider value={{ hotel }}>
        <HotelCard.card>
          <HotelCard.image variant="compact" />
          <HotelCard.content>
            <HotelCard.info />
            <HotelCard.rating>
              <HotelCard.ratingNumber />
              <HotelCard.group>
                <HotelCard.ratingLabel />
                <HotelCard.reviewCount />
              </HotelCard.group>
            </HotelCard.rating>
          </HotelCard.content>

          <div className="bg-primary w-0.5 self-stretch"></div>
          <div>
            <div className="absolute top-0 right-0">
              <HotelCard.closeButton onClose={onClose}></HotelCard.closeButton>
            </div>
            <div className="flex h-full flex-col justify-between pr-7">
              <HotelCard.pricing variant="larger"></HotelCard.pricing>
              <HotelCard.BookButton onBook={() => handleBookClick(hotel)}></HotelCard.BookButton>
            </div>
          </div>
        </HotelCard.card>
      </HotelCardContext.Provider>
    </div>
  );
}
