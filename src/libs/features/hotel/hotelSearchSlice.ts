import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelSearchState {
  location: string;
  startDate: string | null;
  endDate: string | null;
}

const initialState: HotelSearchState = {
  location: "",
  startDate: null,
  endDate: null,
};

const hotelSearchSlice = createSlice({
  name: "hotelSearch",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    resetHotelSearch: () => initialState,
  },
});

export const {
  setLocation,
  setStartDate,
  setEndDate,
  resetHotelSearch,
} = hotelSearchSlice.actions;

// Selectors
export const selectLocation = (state: RootState) =>
  state.hotelSearch.location;
export const selectStartDate = (state: RootState) =>
  state.hotelSearch.startDate;
export const selectEndDate = (state: RootState) =>
  state.hotelSearch.endDate;

export default hotelSearchSlice.reducer;
