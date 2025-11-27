import { configureStore } from '@reduxjs/toolkit';

import serviceTabReducer from '@/features/service-selector/store/serviceSelectorSlice';
import flightSearchReducer from '@/features/flight/store/flightSearchSlice';
import hotelSearchReducer from '@/features/hotel/stores/hotelSearchSlice';
import darkModeReducer from './darkModeSlice';
import chatbotReducer from '@/features/chatbot/stores/chatbotSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      serviceTab: serviceTabReducer,
      flightSearch: flightSearchReducer,
      hotelSearch: hotelSearchReducer,
      darkMode: darkModeReducer,
      chatbot: chatbotReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
