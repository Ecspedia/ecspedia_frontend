import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightSearchState {
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string | null;
  returnDate: string | null;
}

const initialState: FlightSearchState = {
  departureLocation: "",
  arrivalLocation: "",
  departureDate: null,
  returnDate: null,
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setDepartureLocation: (state, action: PayloadAction<string>) => {
      state.departureLocation = action.payload;
    },
    setArrivalLocation: (state, action: PayloadAction<string>) => {
      state.arrivalLocation = action.payload;
    },
    setDepartureDate: (state, action: PayloadAction<string | null>) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<string | null>) => {
      state.returnDate = action.payload;
    },
    swapLocations: (state) => {
      const temp = state.departureLocation;
      state.departureLocation = state.arrivalLocation;
      state.arrivalLocation = temp;
    },
    resetFlightSearch: () => initialState,
  },
});

export const {
  setDepartureLocation,
  setArrivalLocation,
  setDepartureDate,
  setReturnDate,
  swapLocations,
  resetFlightSearch,
} = flightSearchSlice.actions;

// Selectors
export const selectDepartureLocation = (state: RootState) =>
  state.flightSearch.departureLocation;
export const selectArrivalLocation = (state: RootState) =>
  state.flightSearch.arrivalLocation;
export const selectDepartureDate = (state: RootState) =>
  state.flightSearch.departureDate;
export const selectReturnDate = (state: RootState) =>
  state.flightSearch.returnDate;

export default flightSearchSlice.reducer;
