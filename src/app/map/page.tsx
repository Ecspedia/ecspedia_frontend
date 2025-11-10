'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { GoogleHotelMap } from '@/features/hotel/components';
import { cn } from '@/utils/utils';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { useAppSelector } from '@/hooks/hooks';
import { useQuery, useReactiveVar } from '@apollo/client/react';
import { SEARCH_HOTELS_BY_LOCATION } from '@/features/hotel/api/graphql/queries/hotel.queries';
import { hotelSearchParamsVar } from '@/lib/apollo-reactive-vars';
import { Hotel } from '@/types/api';
import { Button } from '@/components/ui';
import { SearchHotelsByLocationData } from '@/types';
import { useMemo } from 'react';

export default function FullScreenMapPage() {
  const router = useRouter();

  // Read search params from Apollo reactive variable
  const searchParams = useReactiveVar(hotelSearchParamsVar);

  // Read hotel data from Apollo cache
  const { data, loading } = useQuery<SearchHotelsByLocationData>(SEARCH_HOTELS_BY_LOCATION, {
    variables: {
      location: searchParams.location,
    },
    skip: !searchParams.location,
    fetchPolicy: 'cache-first',
  });

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

  // Show message if no hotels or no search yet
  if (!searchParams.location || hotels.length === 0) {
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
          'absolute top-2 left-2 z-50 text-primary p-3 rounded-lg font-medium',
          isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
        )}
        title="Close full screen"
      >
        <Button.Icon icon={X} />
        Close
      </Button>
      <GoogleHotelMap hotels={hotels} isFullScreen={true} />
    </div>
  );
}
