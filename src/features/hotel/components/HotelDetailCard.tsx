import HotelCard from '@/components/shared/HotelCard';
import type { Hotel } from '@/types/graphql';
import { useRouter } from 'next/navigation';

interface HotelDetailCardProps {
  hotel: Hotel;
  onClose: () => void;
}

export default function HotelDetailCard({ hotel, onClose }: HotelDetailCardProps) {
  const _router = useRouter();

  return (
    <div className="border-border bg-background text-primary fixed right-0 bottom-0 left-0 z-1000 mx-auto w-11/12 sm:w-4/5 lg:w-3/5 xl:w-1/2 2xl:w-2/5 max-w-[700px] min-w-[320px] rounded-lg border shadow-2xl">
      <HotelCard.Root hotel={hotel}>
        <HotelCard.Card className="lg:gap-2">
          <HotelCard.Image variant="compact" className='rounded-bl-lg rounded-br-none rounded-tr-none' />
          <div className="flex-1 flex flex-col px-3 lg:px-0 lg:max-w-80">
            <div className="flex items-start  gap-2 w-full">
              <div className="flex flex-col flex-1 min-w-0">
                <HotelCard.Info.Title />
                <HotelCard.Info.Location className='' />
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
          </div>

          <div className="bg-primary w-0.5 self-stretch"></div>
          <div>
            <div className="flex h-full flex-col justify-between pr-7">
              <HotelCard.Pricing variant="larger" />
              <HotelCard.BookButton />
            </div>
          </div>
        </HotelCard.Card>
      </HotelCard.Root>
    </div>
  );
}
