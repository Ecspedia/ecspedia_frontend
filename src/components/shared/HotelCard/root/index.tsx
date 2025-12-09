'use client';

import type { HotelResponseDto } from '@/types/graphql';
import { ReactNode } from 'react';
import { HotelCardContext } from '../hotelCardContext';
import type { HotelCardLayout, HotelCardVariant } from '../utils/variantConfig';

interface HotelCardRootProps {
  hotel: HotelResponseDto;
  variant?: HotelCardVariant;
  layout?: HotelCardLayout;
  children: ReactNode;
  isPriority?: boolean;
  isSelected?: boolean;
}

export default function HotelCardRoot({ hotel, variant, layout, children, isPriority, isSelected }: HotelCardRootProps) {
  return (
    <HotelCardContext.Provider value={{ hotel, variant, layout, isPriority, isSelected }}>
      {children}
    </HotelCardContext.Provider>
  );
}
