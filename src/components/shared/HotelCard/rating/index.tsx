import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { useHotelCardContext } from '../hooks/useHotelCardContext';
import { getRatingLabel } from '../utils/getRatingLabel';


interface HotelCardRatingProps {
  children: ReactNode;
  className?: string;
}

export function HotelCardRating({ children, className }: HotelCardRatingProps) {
  return (
    <div className={cn("flex-1", className)}>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}


export function HotelCardRatingNumber() {
  const { hotel } = useHotelCardContext();
  const rating = hotel.rating ?? hotel.stars ?? 0;

  return (
    <div className="bg-success rounded px-2 py-1 text-sm font-bold text-white">
      {rating > 0 ? rating.toFixed(1) : 'N/A'}
    </div>
  );
}


interface HotelCardGroupProps {
  children: ReactNode;
  className?: string;
}

export function HotelCardGroup({ children, className }: HotelCardGroupProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

export function HotelCardRatingLabel() {
  const { hotel } = useHotelCardContext();
  const rating = hotel.rating ?? hotel.stars ?? undefined;
  const label = getRatingLabel(rating);

  return (
    <span className="text-primary text-sm font-semibold">
      {label}
    </span>
  );
}

export function HotelCardReviewCount() {
  const { hotel } = useHotelCardContext();
  const reviewCount = hotel.reviewCount ?? 0;
  return (
    <span className="text-secondary text-xs">
      {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
    </span>
  );
}