import { RootState } from "@/libs/store";
import { ServiceType } from "@/types/services";
import { createSlice } from "@reduxjs/toolkit";

interface ServiceTabState {
  selectedService: ServiceType;
}

const initialState: ServiceTabState = {
  selectedService: ServiceType.FLIGHTS,
};

const serviceTabSlice = createSlice({
  name: "serviceTab",
  initialState,
  reducers: {
    setService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setService } = serviceTabSlice.actions;

// Selector to get the selected service
export const selectService = (state: RootState) =>
  state.serviceTab.selectedService;

export default serviceTabSlice.reducer;
