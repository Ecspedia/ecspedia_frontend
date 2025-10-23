'use client';

import { useAppSelector } from '@/hooks/hooks';

import { ServiceType } from '@/types';
import { SearchHotelForm } from '@/components/features/hotel';
import { ServiceFlightForm } from '@/components/features/flight';
import { selectService } from '@/components/features/service-selector/store/serviceSelectorSlice';

export default function ServiceSearchForm() {
  const currentServiceTabSelected = useAppSelector(selectService);
  if (currentServiceTabSelected === ServiceType.FLIGHTS) return <ServiceFlightForm />;
  if (currentServiceTabSelected === ServiceType.STAYS) return <SearchHotelForm />;
  return <div className="h-30 w-full"></div>;
}
