'use client';

import { TextField } from '@/components/ui';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface HotelFilterProps {
  onFilterChange?: (filters: HotelFilters) => void;
}

export interface HotelFilters {
  searchQuery: string;
  guestRating: string;
  minPrice: number;
  maxPrice: number;
}

const GUEST_RATINGS = [
  { value: 'any', label: 'Any', price: 56 },
  { value: '9+', label: 'Wonderful 9+', price: 56 },
  { value: '8+', label: 'Very good 8+', price: 56 },
  { value: '7+', label: 'Good 7+', price: 56 },
];

export default function HotelFilter({ onFilterChange }: HotelFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [guestRating, setGuestRating] = useState('any');
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(1300);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFilterChange?.({
      searchQuery: value,
      guestRating,
      minPrice,
      maxPrice,
    });
  };

  const handleRatingChange = (rating: string) => {
    setGuestRating(rating);
    onFilterChange?.({
      searchQuery,
      guestRating: rating,
      minPrice,
      maxPrice,
    });
  };

  const handleMinPriceChange = (value: string) => {
    const num = parseInt(value) || 0;
    setMinPrice(num);
    onFilterChange?.({
      searchQuery,
      guestRating,
      minPrice: num,
      maxPrice,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    const num = parseInt(value) || 0;
    setMaxPrice(num);
    onFilterChange?.({
      searchQuery,
      guestRating,
      minPrice,
      maxPrice: num,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search by property name */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-primary">Search by property name</h3>
        <TextField
          icon={Search}
          placeholder="e.g. Marriott"
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-13"
        />
      </div>

      <div className="border-t border-border" />

      {/* Guest rating */}
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
                  onChange={() => handleRatingChange(rating.value)}
                  className="h-4 w-4 border-border text-brand-secondary focus:ring-brand-secondary"
                />
                <span className="text-sm text-primary">{rating.label}</span>
              </div>
              <span className="text-sm text-brand-secondary">${rating.price}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Nightly price */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-primary">Nightly price</h3>
        <div className="flex gap-2">
          <div className="flex-1">
            <TextField
              placeholder="Min"
              value={`$${minPrice}`}
              onChange={(value) => handleMinPriceChange(value.replace(/\D/g, ''))}
              className="h-13"
            />
          </div>
          <div className="flex-1">
            <TextField
              placeholder="Max"
              value={`$${maxPrice}+`}
              onChange={(value) => handleMaxPriceChange(value.replace(/\D/g, ''))}
              className="h-13"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
