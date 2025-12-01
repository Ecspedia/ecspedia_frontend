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
import { cn } from '@/utils/utils';
import { useQuery } from '@apollo/client/react';

export default function Home() {
  const currentServiceTabSelected = useAppSelector(selectService);

  const { data, loading, error } = useQuery(TOP_HOTELS,
    {
      fetchPolicy: 'cache-first',
    }
  );

  const currentServiceContent = () => {
    const hotels = data?.popularHotels ?? [];

    switch (currentServiceTabSelected) {
      case ServiceType.FLIGHTS:
        return <PopularFlights flights={flights} />;
      case ServiceType.STAYS:
        return <HotelPopular hotels={hotels} loading={loading} error={error?.message || ''} />;
      default:
        return null;
    }
  };



  return (
    <>
      <div className="lg:relative lg:bg-[url('/images/home/main-bg.webp')] lg:bg-cover lg:bg-center lg:py-8">
        <div className="pointer-events-none absolute inset-0 hidden bg-black/50 lg:dark:block" />
        <MainContainer className="relative">
          <TitleH1 className="hidden lg:block">Our biggest sale of the year</TitleH1>
          <MultipleServicesForm />
        </MainContainer>
      </div>

      <div className="
        bg-[#191E3B] dark:bg-transparent dark:bg-linear-to-r dark:from-brand-primary/5 dark:via-brand-secondary/5 dark:to-brand-primary/5
      "
      >
        <MainContainer>
          <PromoBanner />
        </MainContainer>
      </div>

      <div className={`px-4 lg:py-4 bg-accent-secondary lg:bg-background dark:bg-background`}>
        <MainContainer className='px-0'>
          {currentServiceContent()}
        </MainContainer>
      </div>



    </>

  );
}

const TitleH1 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h1 className={cn("text-4xl font-semibold text-white text-center", className)}>{children}</h1>;
};
