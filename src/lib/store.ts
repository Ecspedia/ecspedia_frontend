import { configureStore } from '@reduxjs/toolkit';

import serviceTabReducer from '@/lib/features/service-navigation/serviceTabSlice';
import flightSearchReducer from '@/lib/features/flight/flightSearchSlice';
import hotelSearchReducer from '@/lib/features/hotel/hotelSearchSlice';

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
