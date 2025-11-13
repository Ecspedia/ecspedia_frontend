'use client';

import { ServiceType, TopHotelsData } from '@/types';
import { MultipleServicesForm, ServiceSearchForm } from '@/app/_components';
import { ServiceTabSelector } from '@/features/service-selector';
import { useQuery } from '@apollo/client/react';
import HotelPopular from '@/features/hotel/components/HotelPopular';
import { PromoBanner } from '@/features/hotel/components';
import { MainContainer } from '@/components/ui';
import { TOP_HOTELS } from '@/features/hotel/api/hotel.queries';
import { useAppSelector } from '@/hooks';
import { selectService } from '@/features/service-selector/store/serviceSelectorSlice';
import { useMemo } from 'react';
import { PopularFlights } from '@/features/flight';
import { flights } from '@/features/flight/__mocks__/mockFlights';





export default function Home() {
  const currentServiceTabSelected = useAppSelector(selectService);


  const { data, loading, error } = useQuery<TopHotelsData>(TOP_HOTELS);

  const currentServiceContent = useMemo(() => {
    const hotels = data?.popularHotels || [];

    switch (currentServiceTabSelected) {
      case ServiceType.FLIGHTS:
        return <PopularFlights flights={flights} />;
      case ServiceType.STAYS:
        return (
          <HotelPopular hotels={hotels} loading={loading} error={error?.message || ''} />
        );
      default:
        return null;
    }
  }, [currentServiceTabSelected, data, loading, error]);


  return (
    <MainContainer>
      <MultipleServicesForm serviceSelector={<ServiceTabSelector />} serviceForm={<ServiceSearchForm />} />
      <PromoBanner />
      {currentServiceContent}
    </MainContainer>
  );
}
