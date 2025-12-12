import { HotelResponseDto } from '@/types/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface GlobalState {
  selectedHotel: HotelResponseDto | null;
  selectedMapHotel: HotelResponseDto | null;
  selectedHotelForBooking: HotelResponseDto | null;
}

const initialState: GlobalState = {
  selectedHotel: null,
  selectedMapHotel: null,
  selectedHotelForBooking: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSelectedHotel: (state, action: PayloadAction<HotelResponseDto>) => {
      state.selectedHotel = action.payload;
    },
    clearSelectedHotel: (state) => {
      state.selectedHotel = null;
    },
    setSelectedMapHotel: (state, action: PayloadAction<HotelResponseDto>) => {
      state.selectedMapHotel = action.payload;
    },
    clearSelectedMapHotel: (state) => {
      state.selectedMapHotel = null;
    },
    setSelectedHotelForBooking: (state, action: PayloadAction<HotelResponseDto>) => {
      state.selectedHotelForBooking = action.payload;
    },
    clearSelectedHotelForBooking: (state) => {
      state.selectedHotelForBooking = null;
    },
  },
});

export const {
  setSelectedHotel,
  clearSelectedHotel,
  setSelectedMapHotel,
  clearSelectedMapHotel,
  setSelectedHotelForBooking,
  clearSelectedHotelForBooking,
} = globalSlice.actions;

export const selectSelectedHotel = (state: RootState) => state.global.selectedHotel;
export const selectSelectedHotelId = (state: RootState) => state.global.selectedHotel?.id ?? null;
export const selectSelectedMapHotel = (state: RootState) => state.global.selectedMapHotel;
export const selectSelectedHotelForBooking = (state: RootState) =>
  state.global.selectedHotelForBooking;

export default globalSlice.reducer;
