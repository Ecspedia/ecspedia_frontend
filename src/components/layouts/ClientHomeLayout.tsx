'use client';

import { FlightCardList } from '@/components/features/flight';
import { ServiceNavigationTabs, ServiceSearchForm } from '@/components/features/service-navigation';
import { HotelCardList } from '@/components/features/hotel';
import { useAppSelector } from '@/lib/hooks';
import { ServiceType } from '@/types';
import {
  selectHotelResults,
  selectHotelLoading,
  selectHotelError,
} from '@/lib/features/hotel/hotelSearchSlice';
import { useMemo } from 'react';
import { GoogleMapHotel } from '@/components/features/google-hotel-maps';

export default function ClientHomeLayout() {
  const currentServiceTabSelected = useAppSelector((state) => state.serviceTab.selectedService);
  const hotels = useAppSelector(selectHotelResults);
  const hotelsLoading = useAppSelector(selectHotelLoading);
  const error = useAppSelector(selectHotelError);

  const currentServiceContent = useMemo(() => {
    switch (currentServiceTabSelected) {
      case ServiceType.FLIGHTS:
        return <FlightCardList />;
      case ServiceType.STAYS:
        return <HotelCardList hotels={hotels} loading={hotelsLoading} error={error} />;
      default:
        return null;
    }
  }, [currentServiceTabSelected, hotels, hotelsLoading, error]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      <div className="border-border mt-5 flex flex-col rounded-lg border">
        <div className="mx-auto">
          <ServiceNavigationTabs />
        </div>
        <hr className="border-border w-full border-t-1" />
        <ServiceSearchForm />
      </div>
      {hotels.length > 0 && currentServiceTabSelected === ServiceType.STAYS ? (
        <div className="mt-3">
          <GoogleMapHotel hotels={hotels} />
        </div>
      ) : (
        <></>
      )}
      {currentServiceContent && <div className="mt-3">{currentServiceContent}</div>}
    </div>
  );
}
