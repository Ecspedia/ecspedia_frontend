'use client';

import { ReactNode } from 'react';
import { HotelCardContext } from '../hotelCardContext';
import type { Hotel } from '@/types/graphql';
import type { HotelCardVariant, HotelCardLayout } from '../utils/variantConfig';

interface HotelCardRootProps {
  hotel: Hotel;
  variant?: HotelCardVariant;
  layout?: HotelCardLayout;
  children: ReactNode;
}

export default function HotelCardRoot({ hotel, variant, layout, children }: HotelCardRootProps) {
  return (
    <HotelCardContext.Provider value={{ hotel, variant, layout }}>
      {children}
    </HotelCardContext.Provider>
  );
}
