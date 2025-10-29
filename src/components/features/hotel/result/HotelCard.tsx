import { Hotel } from '@/types/hotel';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Heart, Check, X, Star } from 'lucide-react';
import { useHotelCardContext } from './hooks';
import { getRatingLabel, HotelCardContext } from './utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface HotelCardProps {
  hotel: Hotel;
}

// Main HotelCard Component
export default function HotelCard(hotelCardProps: HotelCardProps) {
  const { hotel } = hotelCardProps;
  return (
    <HotelCardContext.Provider value={{ hotel }}>
      <HotelCard.card>
        <HotelCard.image />
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
        <HotelCard.pricing />
      </HotelCard.card>
    </HotelCardContext.Provider>
  );
}

// Compound components
HotelCard.image = function HotelCardImage({
  variant = 'default',
}: {
  variant?: 'default' | 'compact';
}) {
  const { hotel } = useHotelCardContext();
  const sizeClasses = variant === 'compact' ? 'aspect-[4/3] w-48' : 'aspect-[4/3]  w-64';

  return (
    <div className={`group relative ${sizeClasses} shrink-0 overflow-hidden rounded-lg`}>
      <Image
        src={hotel.image || '/images/home/hotel_mock.avif'}
        alt={hotel.name}
        fill
        className="object-cover"
      />
      {variant === 'default' && (
        <button className="absolute top-3 right-3 rounded-full bg-white p-2 transition-transform hover:scale-110">
          <Heart className="text-secondary h-5 w-5" />
        </button>
      )}
    </div>
  );
};

HotelCard.info = function HotelCardInfo({
  withClose,
  onClose,
}: {
  withClose?: boolean;
  onClose?: () => void;
} = {}) {
  const { hotel } = useHotelCardContext();
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col">
        <h3 className="text-primary cursor-pointer text-lg font-semibold hover:underline">
          {hotel.name}
        </h3>
        <p className="text-secondary mt-1 text-sm">{hotel.location}</p>
      </div>
      {withClose && onClose && <HotelCard.closeButton onClose={onClose} />}
    </div>
  );
};

HotelCard.pricing = function HotelCardPricing({
  variant = 'default',
}: {
  variant?: 'default' | 'larger';
}) {
  const { hotel } = useHotelCardContext();
  const textPriceFontSize = cn(variant === 'larger' ? 'text-2xl' : 'text-lg ');
  const textLabelFontSize = cn(variant === 'larger' ? 'text-base' : 'text-sm ');
  return (
    <div className="flex flex-col items-end justify-between">
      <div className="text-right">
        <div className={cn('text-primary mt-1 font-semibold', textPriceFontSize)}>
          ${hotel.pricePerNight}{' '}
          <span className={cn('text-secondary text-sm font-normal', textLabelFontSize)}>
            Per night
          </span>
        </div>
      </div>

      {hotel.includesTaxesAndFees && (
        <div className="text-secondary flex items-center gap-1 text-sm">
          <Check className="text-success h-4 w-4" />
          <span>Total includes taxes and fees</span>
        </div>
      )}
    </div>
  );
};

HotelCard.rating = function HotelCardRating({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1">
      <div className="mt-3 flex items-center gap-2">{children}</div>
    </div>
  );
};

HotelCard.ratingNumber = function HotelCardRatingNumber() {
  const { hotel } = useHotelCardContext();
  return (
    <div className="bg-success rounded px-2 py-1 text-sm font-bold text-white">
      {hotel.rating?.toFixed(1) || 'N/A'}
    </div>
  );
};

HotelCard.group = function HotelCardGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
};

HotelCard.ratingLabel = function HotelCardRatingLabel() {
  const { hotel } = useHotelCardContext();
  return <span className="text-primary text-sm font-semibold">{getRatingLabel(hotel.rating)}</span>;
};

HotelCard.reviewCount = function HotelCardReviewCount() {
  const { hotel } = useHotelCardContext();
  return (
    <span className="text-secondary text-xs">
      {hotel.reviewCount?.toLocaleString() || 0} reviews
    </span>
  );
};

HotelCard.content = function HotelCardContent({ children }: { children: ReactNode }) {
  return <div className="flex-1 flex-col"> {children}</div>;
};

HotelCard.card = function HotelCardCard({ children }: { children: ReactNode }) {
  return <div className="border-border flex gap-4 rounded-lg border p-4"> {children}</div>;
};

// Additional compound components for detail view
HotelCard.closeButton = function HotelCardCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="text-secondary hover:text-primary shrink-0 rounded-full p-1 transition-colors"
    >
      <X className="h-7 w-7" />
    </button>
  );
};

HotelCard.DetailsButton = function HotelCardDetailsButton() {
  return <Button variant="primary" text={'View Details'} className="p-2"></Button>;
};
