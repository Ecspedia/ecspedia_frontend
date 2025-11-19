/**
 * Apollo Reactive Variables for Client-Side State
 *
 * These reactive variables store UI state that needs to be shared across components
 * without prop drilling. They're an Apollo-native alternative to Redux for simple state.
 */

import { DateHelper } from '@/utils/dateHelpers';
import { makeVar } from '@apollo/client';

/**
 * Hotel Search Parameters
 */
export interface HotelSearchParams {
  location: string;
  startDate: string;
  endDate: string;
  adults: number;
}

/**
 * Reactive variable for hotel search parameters
 * Updated when user submits search form
 */
export const hotelSearchParamsVar = makeVar<HotelSearchParams>({
  location: 'Santiago',
  startDate: DateHelper.getToday().toString(),
  endDate: DateHelper.pastTomorrow().toString(),
  adults: 1,
});
export const hotelSearchSubmittedParamsVar = makeVar<HotelSearchParams | null>(null);

/**
 * Helper to update hotel search params
 */
export const updateHotelSearchParams = (params: Partial<HotelSearchParams>) => {
  hotelSearchParamsVar({
    ...hotelSearchParamsVar(),
    ...params,
  });
};

/**
 * Helper to reset hotel search params to defaults
 */
export const resetHotelSearchParams = () => {
  hotelSearchParamsVar({
    location: '',
    startDate: DateHelper.getToday().toString(),
    endDate: DateHelper.pastTomorrow().toString(),
    adults: 2,
  });
};

export const syncSubmittedValues = () => {
  hotelSearchSubmittedParamsVar(hotelSearchParamsVar());
};
