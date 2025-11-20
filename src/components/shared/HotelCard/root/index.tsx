'use client';

import { ReactNode } from 'react';
import { HotelCardContext } from '../hotelCardContext';
import type { Hotel } from '@/types/graphql';

interface HotelCardRootProps {
  hotel: Hotel;
  children: ReactNode;
}

export default function HotelCardRoot({ hotel, children }: HotelCardRootProps) {
  return (
    <HotelCardContext.Provider value={{ hotel }}>
      {children}
    </HotelCardContext.Provider>
  );
}
