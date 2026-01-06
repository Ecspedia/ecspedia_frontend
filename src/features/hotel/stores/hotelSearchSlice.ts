import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores/store';
import { GuestRating } from '../utils/getRatingByFilterLabels';

interface HotelSearchFilters {
  searchQuery: string;
  rating: GuestRating;
  minPrice: number;
  maxPrice: number;
}

interface HotelSearchFilterState {
  filters: HotelSearchFilters;
}

const initialState: HotelSearchFilterState = {
  filters: {
    searchQuery: '',
    rating: GuestRating.ANY,
    minPrice: 0,
    maxPrice: 1500,
  },
};

const hotelSearchSlice = createSlice({
  name: 'hotelSearch',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<HotelSearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
  },
});

export const { updateFilters, resetFilters } = hotelSearchSlice.actions;

export const selectFilters = (state: RootState) => state.hotelSearch.filters;

export default hotelSearchSlice.reducer;
