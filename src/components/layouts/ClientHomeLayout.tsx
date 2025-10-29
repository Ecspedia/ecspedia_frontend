'use client';

import { FlightCardList } from '@/components/features/flight';
import { ServiceTabSelector, ServiceSearchForm } from '@/components/features/service-selector';
import { HotelCardList, GoogleHotelMap } from '@/components/features/hotel';
import { useAppSelector } from '@/hooks/hooks';
import { ServiceType } from '@/types';
import {
  selectHotelResults,
  selectHotelLoading,
  selectHotelError,
} from '@/components/features/hotel/search-form/store/hotelSearchSlice';
import { useMemo } from 'react';
import { selectService } from '@/components/features/service-selector/store/serviceSelectorSlice';
import dynamic from 'next/dynamic';
import HotelSearchResult from '../features/hotel/result/HotelSearchResult';

const DynamicGoogleHotelMap = dynamic(
  () => import('@/components/features/hotel').then((mod) => ({ default: mod.GoogleHotelMap })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] w-full animate-pulse rounded-xl bg-muted" />,
  }
);

export default function ClientHomeLayout() {
  const currentServiceTabSelected = useAppSelector(selectService);
  const hotels = useAppSelector(selectHotelResults);
  const hotelsLoading = useAppSelector(selectHotelLoading);
  const error = useAppSelector(selectHotelError);

  const currentServiceContent = useMemo(() => {
    switch (currentServiceTabSelected) {
      case ServiceType.FLIGHTS:
        return <FlightCardList />;
      case ServiceType.STAYS:
        return <HotelSearchResult hotels={hotels} loading={hotelsLoading} error={error} />;
      default:
        return null;
    }
  }, [currentServiceTabSelected, hotels, hotelsLoading, error]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      <div className="border-border mt-5 flex flex-col rounded-lg border">
        <div className="mx-auto">
          <ServiceTabSelector />
        </div>
        <hr className="border-border w-full border-t" />
        <ServiceSearchForm />
      </div>

      <div
        className={
          hotels.length > 0 && currentServiceTabSelected === ServiceType.STAYS ? 'mt-3' : 'hidden'
        }
      >
        <DynamicGoogleHotelMap hotels={hotels} />
      </div>

      {currentServiceContent && <div className="mt-3">{currentServiceContent}</div>}
    </div>
  );
}
