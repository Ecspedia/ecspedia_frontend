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

/**
 * Reactive variable to track if hotel search has been submitted
 * Used to control when useQuery should run in page.tsx
 */
export const hotelSearchSubmittedVar = makeVar<boolean>(false);

/**
 * Helper to set hotel search as submitted
 */
export const hotelSearchSubmittedParamsVar = makeVar<HotelSearchParams | null>(null);

export const setHotelSearchSubmitted = (submitted: boolean, params?: HotelSearchParams) => {
  hotelSearchSubmittedVar(submitted);
  if (submitted && params) {
    hotelSearchSubmittedParamsVar(params);
  }
};
