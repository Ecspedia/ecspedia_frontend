import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HotelResponseDto } from '@/types/graphql';
import { RootState } from './store';

interface GlobalState {
  selectedHotel: HotelResponseDto | null;
  selectedMapHotel: HotelResponseDto | null;
}

const initialState: GlobalState = {
  selectedHotel: null,
  selectedMapHotel: null,
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
  },
});

export const { setSelectedHotel, clearSelectedHotel, setSelectedMapHotel, clearSelectedMapHotel } = globalSlice.actions;

export const selectSelectedHotel = (state: RootState) => state.global.selectedHotel;
export const selectSelectedHotelId = (state: RootState) => state.global.selectedHotel?.id ?? null;
export const selectSelectedMapHotel = (state: RootState) => state.global.selectedMapHotel;

export default globalSlice.reducer;
