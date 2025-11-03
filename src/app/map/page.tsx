'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { GoogleMapHotel } from '@/components/features/hotel/map';
import { cn } from '@/lib/utils';
import { selectIsDarkMode } from '@/components/features/dark-mode';
import { useAppSelector } from '@/hooks/hooks';
import { useQuery, useReactiveVar } from '@apollo/client/react';
import { GET_HOTELS_BY_LOCATION } from '@/graphql/queries/hotel.queries';
import { hotelSearchParamsVar } from '@/lib/apollo-reactive-vars';
import { Hotel } from '@/types/hotel';

interface GetHotelsByLocationResponse {
  hotelsByLocation: Hotel[];
}

export default function FullScreenMapPage() {
  const router = useRouter();

  // Read search params from Apollo reactive variable
  const searchParams = useReactiveVar(hotelSearchParamsVar);

  // Read hotel data from Apollo cache
  const { data, loading } = useQuery<GetHotelsByLocationResponse>(GET_HOTELS_BY_LOCATION, {
    variables: { location: searchParams.location },
    skip: !searchParams.location,
    fetchPolicy: 'cache-first',
  });

  const hotels = data?.hotelsByLocation || [];

  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleClose = () => {
    router.back();
  };

  // Show message if no hotels or no search yet
  if (!searchParams.location || hotels.length === 0) {
    return (
      <div className="relative h-screen w-screen flex items-center justify-center bg-background">
        <button
          onClick={handleClose}
          className={cn(
            'text-primary hover:bg-muted absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg px-4 py-3 font-semibold shadow-lg transition-all hover:shadow-xl',
            isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
          )}
          title="Close full screen"
        >
          <X className="h-5 w-5" />
          <span>Close</span>
        </button>
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground mb-2">No hotels to display</p>
          <p className="text-muted-foreground">Search for hotels to see them on the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen">
      <button
        onClick={handleClose}
        className={cn(
          'text-primary hover:bg-muted absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg px-4 py-3 font-semibold shadow-lg transition-all hover:shadow-xl',
          isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
        )}
        title="Close full screen"
      >
        <X className="h-5 w-5" />
        <span>Close</span>
      </button>
      <GoogleMapHotel hotels={hotels} isFullScreen={true} />
    </div>
  );
}
