'use client';

import { HotelResponseDto } from '@/types/graphql';
import { HotelNameFilter } from './HotelNameFilter';
import { HotelPriceFilter } from './HotelPriceFilter';
import { HotelRatingFilter } from './HotelRatingFilter';

interface HotelFilterProps {
  hotels: HotelResponseDto[];
}

export interface HotelFilters {
  searchQuery: string;
  guestRating: string;
  minPrice: number;
  maxPrice: number;
}

export default function HotelFilter({ hotels }: HotelFilterProps) {
  return (
    <div className="space-y-6">
      <HotelNameFilter hotels={hotels} />
      <div className="border-t border-border" />
      <HotelRatingFilter />
      <div className="border-t border-border" />
      <HotelPriceFilter />
    </div>
  );
}
