import { Check } from 'lucide-react';

import { Hotel } from '@/types/hotel';

import { HotelCardContext } from './utils/types';
import HotelCardImage from './HotelImage';
import HotelCardPricing from './HotelPricing';
import HotelCardRating from './HotelRating';
import HotelCardInfo from './HotelInfo';
import { ReactNode } from 'react';

interface HotelCardProps {
  hotel: Hotel;
}

HotelCard.image = HotelCardImage;
HotelCard.info = HotelCardInfo;
HotelCard.pricing = HotelCardPricing;
HotelCard.rating = HotelCardRating;
HotelCard.content = function HotelCardContent({ children }: { children: ReactNode }) {
  return <div className="flex-1 flex-col"> {children}</div>;
};

export default function HotelCard(hotelCardProps: HotelCardProps) {
  const { hotel } = hotelCardProps;
  return (
    <HotelCardContext.Provider value={{ hotel }}>
      <div className="border-border flex gap-4 rounded-lg border p-4">
        <HotelCard.image />
        <HotelCard.content>
          <HotelCard.info />
          <HotelCard.rating />
        </HotelCard.content>
        <HotelCard.pricing />
      </div>
    </HotelCardContext.Provider>
  );
}
