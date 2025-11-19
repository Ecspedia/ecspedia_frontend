'use client';

import { MultipleServicesForm } from '@/app/_components';
import { MainContainer } from '@/components/ui';
import { PopularFlights } from '@/features/flight';
import { flights } from '@/features/flight/__mocks__/mockFlights';
import { TOP_HOTELS } from '@/features/hotel/api/hotel.queries';
import { PromoBanner } from '@/features/hotel/components';
import HotelPopular from '@/features/hotel/components/HotelPopular';

import { selectService } from '@/features/service-selector/store/serviceSelectorSlice';
import { useAppSelector } from '@/hooks';
import { ServiceType } from '@/types';
import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';

export default function Home() {
  const currentServiceTabSelected = useAppSelector(selectService);

  const { data, loading, error } = useQuery(TOP_HOTELS);


  const currentServiceContent = useMemo(() => {
    const hotels = data?.popularHotels || [];
    switch (currentServiceTabSelected) {
      case ServiceType.FLIGHTS:
        return <PopularFlights flights={flights} />;
      case ServiceType.STAYS:
        return <HotelPopular hotels={hotels} loading={loading} error={error?.message || ''} />;
      default:
        return null;
    }
  }, [currentServiceTabSelected, data, loading, error]);

  return (

    <MainContainer>
      <MultipleServicesForm />
      <PromoBanner />
      {currentServiceContent}
    </MainContainer>

  );
}
