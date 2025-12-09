import { useLazyQuery } from '@apollo/client/react';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SEARCH_HOTELS_BY_LOCATION } from '../api/hotel.queries';
import { HotelSearchParams } from '../stores/hotelSearchSlice';
import { useHotelSearchParams } from './useHotelSearchParams.hook';

export function useHotelSearch() {
  const { queryString } = useHotelSearchParams();
  const router = useRouter();
  const currentQs = queryString;

  const [fetchHotels, { data, loading, error }] = useLazyQuery(SEARCH_HOTELS_BY_LOCATION, {
    fetchPolicy: 'cache-and-network',
  });

  const handleSubmit = useCallback(
    (data: HotelSearchParams) => {
      const params = new URLSearchParams({
        location: data.location,
        startDate: data.startDate ?? '',
        endDate: data.endDate ?? '',
        adults: data.adults.toString(),
      });

      if (params.toString() === currentQs) {
        fetchHotels({ variables: { location: data.location } });
      } else {
        router.push(`?${params}`);
      }
    },
    [currentQs, fetchHotels, router]
  );

  return {
    hotels: data?.hotelsByLocation ?? [],
    loading,
    error: error?.message,
    handleSubmit,
    fetchHotels,
  };
}
