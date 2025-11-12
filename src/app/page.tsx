'use client';

import { TopHotelsData } from '@/types';
import { MultipleServicesForm, ServiceSearchForm } from '@/app/_components';
import { ServiceTabSelector } from '@/features/service-selector';
import { useQuery } from '@apollo/client/react';
import HotelPopular from '@/features/hotel/components/HotelPopular';
import { PromoBanner } from '@/features/hotel/components';
import { MainContainer } from '@/components/ui';
import { TOP_HOTELS } from '@/features/hotel/api/graphql/queries';


export default function Home() {
  // const currentServiceTabSelected = useAppSelector(selectService);

  // // Use the hotel search query hook
  // const { hotels, loading: hotelsLoading, error: errorMessage } = useHotelSearchQuery();
  // const location = useReactiveVar(hotelSearchSubmittedParamsVar)?.location || '';


  // const currentServiceContent = useMemo(() => {
  //   switch (currentServiceTabSelected) {
  //     case ServiceType.FLIGHTS:
  //       return <FlightCardList />;
  //     case ServiceType.STAYS:
  //       return (

  //         <HotelSearchResult hotels={hotels} loading={hotelsLoading} error={errorMessage} />
  //       );
  //     default:
  //       return null;
  //   }
  // }, [currentServiceTabSelected, hotels, hotelsLoading, errorMessage]);

  const { data, loading, error } = useQuery<TopHotelsData>(TOP_HOTELS);
  const hotels = data?.popularHotels || [];

  return (
    <MainContainer>
      <MultipleServicesForm serviceSelector={<ServiceTabSelector />} serviceForm={<ServiceSearchForm />} />
      <PromoBanner />
      <HotelPopular hotels={hotels} loading={loading} error={error?.message || ''} />
    </MainContainer>
  );
}
