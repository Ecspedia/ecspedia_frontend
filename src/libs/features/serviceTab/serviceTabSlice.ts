import { RootState } from "@/libs/store";
import { createSlice } from "@reduxjs/toolkit";

const serviceTabSlice = createSlice({
  name: "serviceTab",
  initialState: {
    selectedService: "Flights", // default
  },
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
