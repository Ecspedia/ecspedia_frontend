/**
 * Apollo Reactive Variables for Client-Side State
 *
 * These reactive variables store UI state that needs to be shared across components
 * without prop drilling. They're an Apollo-native alternative to Redux for simple state.
 */

import { makeVar } from '@apollo/client';

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use `src/stores/globalSlice.ts` instead.
 *
 * @deprecated Use Redux selectors (selectFormValues, selectSubmittedValues) from @/stores/globalSlice
 */
export const hotelSearchParamsVar = makeVar<{ location: string; startDate: string; endDate: string; adults: number }>({
  location: '',
  startDate: '',
  endDate: '',
  adults: 2,
});

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use `src/stores/globalSlice.ts` instead.
 *
 * @deprecated Use Redux selector selectSubmittedValues from @/stores/globalSlice
 */
export const hotelSearchSubmittedParamsVar = makeVar<{ location: string; startDate: string; endDate: string; adults: number } | null>(null);

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use Redux dispatch with globalSlice hotel search actions instead.
 *
 * @deprecated Use Redux dispatch(updateFormLocation(...)) and other hotel search actions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateHotelSearchParams = (_params: any) => {
  console.warn(
    'updateHotelSearchParams is deprecated. Use Redux globalSlice hotel search actions instead. ' +
    'Import and dispatch actions from @/stores/globalSlice'
  );
};

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use Redux dispatch with globalSlice hotel search actions instead.
 *
 * @deprecated Use Redux dispatch(resetFormValues())
 */
export const resetHotelSearchParams = () => {
  console.warn(
    'resetHotelSearchParams is deprecated. Use Redux dispatch(resetFormValues()) instead. ' +
    'Import resetFormValues from @/stores/globalSlice'
  );
};

/**
 * DEPRECATED: Hotel search state has been migrated to Redux Toolkit.
 * Use Redux dispatch with globalSlice hotel search actions instead.
 *
 * @deprecated Use Redux dispatch(submitSearch())
 */
export const syncSubmittedValues = () => {
  console.warn(
    'syncSubmittedValues is deprecated. Use Redux dispatch(submitSearch()) instead. ' +
    'Import submitSearch from @/stores/globalSlice'
  );
};
