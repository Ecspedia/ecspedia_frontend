'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect } from 'react';
import { selectFilters, updateFilters } from '../stores/hotelSearchSlice';
import { GuestRating } from '../utils/getRatingByFilterLabels';

const GUEST_RATINGS = [
  { value: 'any', label: 'Any', price: 56 },
  { value: '9+', label: 'Wonderful 9+', price: 56 },
  { value: '8+', label: 'Very good 8+', price: 56 },
  { value: '7+', label: 'Good 7+', price: 56 },
];

export function HotelRatingFilter() {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const guestRating = filters.rating;

  const handleRatingChange = (rating: GuestRating) => {
    dispatch(updateFilters({ rating }));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-primary">Guest rating</h3>
        <span className="text-sm font-medium text-primary">From</span>
      </div>
      <div className="space-y-2">
        {GUEST_RATINGS.map((rating) => (
          <label
            key={rating.value}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="guestRating"
                value={rating.value}
                checked={guestRating === rating.value}
                onChange={() => handleRatingChange(rating.value as GuestRating)}
                className="h-4 w-4 border-border text-brand-secondary focus:ring-brand-secondary"
              />
              <span className="text-sm text-primary">{rating.label}</span>
            </div>
            <span className="text-sm text-brand-secondary">${rating.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
