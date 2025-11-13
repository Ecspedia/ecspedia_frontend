import { useHotelCardContext } from '../hooks/useHotelCardContext';
import { getRatingLabel } from '../utils/getRatingLabel';
import { ReactNode } from 'react';


// HotelCardRating - Container for rating components
interface HotelCardRatingProps {
  children: ReactNode;
}

export function HotelCardRating({ children }: HotelCardRatingProps) {
  return (
    <div className="flex-1">
      <div className="mt-3 flex items-center gap-2">{children}</div>
    </div>
  );
}

// HotelCardRatingNumber - Displays the rating number
export function HotelCardRatingNumber() {
  const { hotel } = useHotelCardContext();
  // Use rating if available, otherwise use stars
  const rating = hotel.rating ?? hotel.stars ?? 0;

  return (
    <div className="bg-success rounded px-2 py-1 text-sm font-bold text-white">
      {rating > 0 ? rating.toFixed(1) : 'N/A'}
    </div>
  );
}

// HotelCardGroup - Wrapper for rating group
interface HotelCardGroupProps {
  children: ReactNode;
}

export function HotelCardGroup({ children }: HotelCardGroupProps) {
  return <div className="flex flex-col">{children}</div>;
}

// HotelCardRatingLabel - Displays rating label (0-10) with descriptive text
export function HotelCardRatingLabel() {
  const { hotel } = useHotelCardContext();
  // Use rating value (0-10), fallback to stars if rating not available
  const rating = hotel.rating ?? hotel.stars ?? undefined;
  const label = getRatingLabel(rating);

  return (
    <span className="text-primary text-sm font-semibold">
      {label}
    </span>
  );
}

// HotelCardReviewCount - Displays review count or location
export function HotelCardReviewCount() {
  const { hotel } = useHotelCardContext();

  // Show review count if available, otherwise show 0 reviews
  const reviewCount = hotel.reviewCount ?? 0;

  return (
    <span className="text-secondary text-xs">
      {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
    </span>
  );
}