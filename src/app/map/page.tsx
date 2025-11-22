'use client';

import { GoogleHotelMap } from '@/features/hotel/components';
import { useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { cn } from '@/utils/utils';
import { useQuery, useReactiveVar } from '@apollo/client/react';
import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui';
import { SEARCH_HOTELS_BY_LOCATION } from '@/features/hotel/api/hotel.queries';
import { hotelSearchParamsVar } from '@/lib/apollo-reactive-vars';
import type { Hotel, SearchHotelsByLocationQuery } from '@/types/graphql';
import { Suspense, useMemo } from 'react';

function FullScreenMapContent() {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  // Get URL parameters for direct hotel location
  const lat = urlSearchParams.get('lat');
  const lng = urlSearchParams.get('lng');
  const hotelId = urlSearchParams.get('hotelId');
  const locationParam = urlSearchParams.get('location');

  // Read search params from Apollo reactive variable
  const searchParams = useReactiveVar(hotelSearchParamsVar);

  // Use URL location param or Apollo reactive variable
  const searchLocation = locationParam || searchParams.location;

  // Read hotel data from Apollo cache
  const { data, loading } = useQuery<SearchHotelsByLocationQuery>(SEARCH_HOTELS_BY_LOCATION, {
    variables: {
      location: searchLocation,
    },
    skip: !searchLocation,
    fetchPolicy: 'cache-first',
  });

  // Calculate center from URL params or default
  const center = useMemo(() => {
    if (lat && lng) {
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    }
    return undefined;
  }, [lat, lng]);

  // Get hotels directly from the response (now it's an array)
  const hotels = useMemo<Hotel[]>(() => {
    return data?.hotelsByLocation || [];
  }, [data?.hotelsByLocation]);

  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleClose = () => {
    router.back();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="relative h-screen w-screen flex items-center justify-center bg-background">
        <Button
          onClick={handleClose}
          variant="blank"
          className={cn(
            'absolute top-2 left-2 z-50 text-primary p-3 rounded-lg font-medium',
            isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
          )}
          title="Close full screen"
        >
          <Button.Icon icon={X} />
          Close
        </Button>
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading hotels...</p>
        </div>
      </div>
    );
  }

  // Show message if no hotels or no search yet (but allow direct coordinates)
  if (!searchLocation && !center) {
    return (
      <div className="relative h-screen w-screen flex items-center justify-center bg-background">
        <Button
          onClick={handleClose}
          variant="blank"
          className={cn(
            'absolute top-2 left-2 z-50 text-primary p-3 rounded-lg font-medium',
            isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
          )}
          title="Close full screen"
        >
          <Button.Icon icon={X} />
          Close
        </Button>
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground mb-2">No hotels to display</p>
          <p className="text-muted-foreground">Search for hotels to see them on the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen">
      <Button
        onClick={handleClose}
        variant="blank"
        className={cn(
          'absolute top-2 left-2 z-50 text-primary p-3 rounded-lg font-medium flex items-center justify-center gap-2',
          isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
        )}
        title="Close full screen"
      >
        <Button.Icon icon={X} />
        Close
      </Button>
      <GoogleHotelMap
        hotels={hotels}
        isFullScreen={true}
        initialCenter={center}
        initialSelectedHotelId={hotelId || undefined}
      />
    </div>
  );
}

function MapLoadingFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  );
}

export default function FullScreenMapPage() {
  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <FullScreenMapContent />
    </Suspense>
  );
}
