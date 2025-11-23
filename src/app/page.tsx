'use client';

import { MultipleServicesForm } from '@/app/_components';
import { MainContainer } from '@/components/ui';
import { PopularFlights } from '@/features/flight';
import { flights } from '@/features/flight/__mocks__/mockFlights';
import { TOP_HOTELS } from '@/features/hotel/api/hotel.queries';
import { PromoBanner } from '@/features/hotel/components';
import HotelPopular from '@/features/hotel/components/HotelPopular';

import { selectService } from '@/features/service-selector/store/serviceSelectorSlice';
import { useAppSelector, useDarkMode, useIsMobile } from '@/hooks';
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
  const { isDarkMode } = useDarkMode();
  const isMobile = useIsMobile();
  return (

    <>
      {!isMobile && (
        <div className="relative bg-[url('/images/home/main-bg.webp')] bg-cover bg-center py-8">
          <div className="pointer-events-none absolute inset-0 hidden bg-black/50 dark:block" />
          <MainContainer className="relative">
            <TitleH1>Our biggest sale of the year</TitleH1>
            <MultipleServicesForm />
          </MainContainer>
        </div>
      )}

      {isMobile && (
        <MainContainer>
          <MultipleServicesForm />
        </MainContainer>
      )}


      <div className={`${!isDarkMode ? 'bg-[#191E3B]' : 'bg-linear-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5'}`}>
        <MainContainer>
          <PromoBanner />
        </MainContainer>
      </div>
      <MainContainer className='px-0'>
        <div className={`px-2 lg:py-4 bg-accent-secondary lg:bg-background ${isDarkMode ? 'bg-background' : 'bg-accent-secondary'}`}>
          {currentServiceContent}
        </div>
      </MainContainer >


    </>

  );
}

const TitleH1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-4xl font-semibold text-white text-center">{children}</h1>;
};
