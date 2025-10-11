import { configureStore } from "@reduxjs/toolkit";

import serviceTabReducer from "@/libs/features/serviceTab/serviceTabSlice";
import flightSearchReducer from "@/libs/features/flightSearch/flightSearchSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      serviceTab: serviceTabReducer,
      flightSearch: flightSearchReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
