'use client';

import { GoogleHotelMap } from '@/features/hotel/components';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { clearSelectedMapHotel, selectSelectedMapHotel, selectSubmittedValues } from '@/stores/globalSlice';
import { cn } from '@/utils/utils';
import { useQuery } from '@apollo/client/react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { SEARCH_HOTELS_BY_LOCATION } from '@/features/hotel/api/hotel.queries';
import type { HotelResponseDto, SearchHotelsByLocationQuery } from '@/types/graphql';
import { Suspense, useMemo } from 'react';

function FullScreenMapContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get selected hotel from Redux
  const selectedMapHotel = useAppSelector(selectSelectedMapHotel);

  // Read search params from Redux
  const submittedValues = useAppSelector(selectSubmittedValues);
  const searchLocation = submittedValues?.location;

  // Read hotel data from Apollo cache
  const { data, loading } = useQuery<SearchHotelsByLocationQuery>(SEARCH_HOTELS_BY_LOCATION, {
    variables: {
      location: searchLocation,
    },
    skip: !searchLocation,
    fetchPolicy: 'cache-first',
  });

  // Calculate center from selected hotel coordinates
  const center = useMemo(() => {
    if (selectedMapHotel?.latitude && selectedMapHotel?.longitude) {
      const lat = typeof selectedMapHotel.latitude === 'string'
        ? parseFloat(selectedMapHotel.latitude)
        : Number(selectedMapHotel.latitude);
      const lng = typeof selectedMapHotel.longitude === 'string'
        ? parseFloat(selectedMapHotel.longitude)
        : Number(selectedMapHotel.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return undefined;
  }, [selectedMapHotel]);

  // Get hotels directly from the response (now it's an array)
  const hotels = useMemo<HotelResponseDto[]>(() => {
    return data?.hotelsByLocation || [];
  }, [data?.hotelsByLocation]);

  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleClose = () => {
    dispatch(clearSelectedMapHotel());
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

  // Show message if no hotels or no search yet (but allow selected hotel)
  if (!searchLocation && !selectedMapHotel) {
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
        initialSelectedHotel={selectedMapHotel ?? undefined}
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
