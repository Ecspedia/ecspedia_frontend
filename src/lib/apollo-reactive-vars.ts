/**
 * Apollo Reactive Variables for Client-Side State
 *
 * These reactive variables store UI state that needs to be shared across components
 * without prop drilling. They're an Apollo-native alternative to Redux for simple state.
 */

import { makeVar } from '@apollo/client';

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use `src/features/hotel/stores/hotelSearchSlice.ts` instead.
 *
 * @deprecated Use Redux hotelSearchSlice selectors (selectFormValues, selectSubmittedValues)
 */
export const hotelSearchParamsVar = makeVar<{ location: string; startDate: string; endDate: string; adults: number }>({
  location: '',
  startDate: '',
  endDate: '',
  adults: 2,
});

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use `src/features/hotel/stores/hotelSearchSlice.ts` instead.
 *
 * @deprecated Use Redux hotelSearchSlice selector selectSubmittedValues
 */
export const hotelSearchSubmittedParamsVar = makeVar<{ location: string; startDate: string; endDate: string; adults: number } | null>(null);

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use Redux dispatch with hotelSearchSlice actions instead.
 *
 * @deprecated Use Redux dispatch(updateFormLocation(...)) and other hotelSearchSlice actions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateHotelSearchParams = (_params: any) => {
  console.warn(
    'updateHotelSearchParams is deprecated. Use Redux hotelSearchSlice actions instead. ' +
    'Import and dispatch actions from @/features/hotel/stores/hotelSearchSlice'
  );
};

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use Redux dispatch with hotelSearchSlice actions instead.
 *
 * @deprecated Use Redux dispatch(resetFormValues())
 */
export const resetHotelSearchParams = () => {
  console.warn(
    'resetHotelSearchParams is deprecated. Use Redux dispatch(resetFormValues()) instead. ' +
    'Import resetFormValues from @/features/hotel/stores/hotelSearchSlice'
  );
};

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use Redux dispatch with hotelSearchSlice actions instead.
 *
 * @deprecated Use Redux dispatch(submitSearch())
 */
export const syncSubmittedValues = () => {
  console.warn(
    'syncSubmittedValues is deprecated. Use Redux dispatch(submitSearch()) instead. ' +
    'Import submitSearch from @/features/hotel/stores/hotelSearchSlice'
  );
};
