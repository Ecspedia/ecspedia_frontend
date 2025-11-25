'use client';

import type { Hotel } from '@/types/graphql';
import { ReactNode } from 'react';
import { HotelCardContext } from '../hotelCardContext';
import type { HotelCardLayout, HotelCardVariant } from '../utils/variantConfig';

interface HotelCardRootProps {
  hotel: Hotel;
  variant?: HotelCardVariant;
  layout?: HotelCardLayout;
  children: ReactNode;
  isPriority?: boolean;
}

export default function HotelCardRoot({ hotel, variant, layout, children, isPriority }: HotelCardRootProps) {
  return (
    <HotelCardContext.Provider value={{ hotel, variant, layout, isPriority }}>
      {children}
    </HotelCardContext.Provider>
  );
}
