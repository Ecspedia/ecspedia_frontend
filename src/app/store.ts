import { configureStore } from '@reduxjs/toolkit';

import serviceTabReducer from '@/components/features/service-selector/store/serviceSelectorSlice';
import flightSearchReducer from '@/components/features/flight/store/flightSearchSlice';
import hotelSearchReducer from '@/components/features/hotel/search-form/store/hotelSearchSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      serviceTab: serviceTabReducer,
      flightSearch: flightSearchReducer,
      hotelSearch: hotelSearchReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
