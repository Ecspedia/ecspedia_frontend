import { DateHelper } from '@/utils/dateHelpers';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useHotelSearchParams() {
  const searchParams = useSearchParams();

  return useMemo(
    () => ({
      location: searchParams.get('location') || '',
      startDate: DateHelper.normalizeDateString(
        new Date(searchParams.get('startDate') || DateHelper.getToday())
      ),
      endDate: DateHelper.normalizeDateString(
        new Date(searchParams.get('endDate') || DateHelper.pastTomorrow())
      ),
      adults: parseInt(searchParams.get('adults') || searchParams.get('guests') || '2', 10),
      queryString: searchParams.toString(),
    }),
    [searchParams]
  );
}
