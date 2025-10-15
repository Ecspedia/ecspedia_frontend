'use client';

import { useAppSelector } from '@/lib/hooks';

import { ServiceType } from '@/types';
import { SearchHotelForm } from '@/components/features/hotel';
import { ServiceSearchFlightForm } from '@/components/features/flight';
import { selectService } from '@/lib/features/service-navigation/serviceTabSlice';

export default function ServiceSearchForm() {
  const currentServiceTabSelected = useAppSelector(selectService);

  if (currentServiceTabSelected === ServiceType.FLIGHTS)
    return <ServiceSearchFlightForm></ServiceSearchFlightForm>;
  if (currentServiceTabSelected === ServiceType.STAYS) return <SearchHotelForm></SearchHotelForm>;
  return <div className="h-30 w-full"></div>;
}
