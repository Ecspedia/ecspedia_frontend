import { Hotel } from '@/types/api';
import { useRouter } from 'next/navigation';
import { HotelCardContext } from '../utils/hotelCardContext';
import HotelCard from '@/components/shared/HotelCard';

interface HotelDetailCardProps {
  hotel: Hotel;
  onClose: () => void;
}

export default function HotelDetailCard({ hotel, onClose }: HotelDetailCardProps) {
  const _router = useRouter();

  return (
    <div className="border-border bg-background text-primary fixed right-0 bottom-0 left-0 z-1000 mx-auto w-11/12 sm:w-4/5 lg:w-3/5 xl:w-1/2 2xl:w-2/5 max-w-[700px] min-w-[320px] rounded-lg border shadow-2xl">
      <HotelCardContext.Provider value={{ hotel }}>
        <HotelCard.Card>
          <HotelCard.Image variant="compact" />
          <HotelCard.Content>
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <HotelCard.Info.Title />
                <HotelCard.Info.Location />
              </div>
              <HotelCard.Info.CloseButton onClose={onClose} />
            </div>
            <HotelCard.Rating>
              <HotelCard.RatingNumber />
              <HotelCard.Group>
                <HotelCard.RatingLabel />
                <HotelCard.ReviewCount />
              </HotelCard.Group>
            </HotelCard.Rating>
          </HotelCard.Content>

          <div className="bg-primary w-0.5 self-stretch"></div>
          <div>
            <div className="flex h-full flex-col justify-between pr-7">
              <HotelCard.Pricing variant="larger" />
              <HotelCard.BookButton />
            </div>
          </div>
        </HotelCard.Card>
      </HotelCardContext.Provider>
    </div>
  );
}
