'use client';

import { Hotel } from '@/types/graphql';
import { HotelNameFilter } from './HotelNameFilter';
import { HotelRatingFilter } from './HotelRatingFilter';
import { HotelPriceFilter } from './HotelPriceFilter';

interface HotelFilterProps {
  hotels: Hotel[];
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
