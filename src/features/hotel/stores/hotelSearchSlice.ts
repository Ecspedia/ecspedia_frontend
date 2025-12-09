import { RootState } from '@/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// TODO: Restore hotelService - File was moved/deleted
// import { hotelService } from '../api/hotelService';
import type { HotelResponseDto } from '@/types/graphql';
import { GuestRating } from '../utils/getRatingByFilterLabels';

export interface HotelSearchParams {
  location: string;
  startDate: string | null;
  endDate: string | null;
  adults: number;
}

interface HotelSearchFilters {
  searchQuery: string;
  rating: GuestRating;
  minPrice: number;
  maxPrice: number;
}

interface HotelSearchQueryState {
  data: HotelResponseDto[];
  loading: boolean;
  error: string | null;
}

interface HotelSearchState {
  formValues: HotelSearchParams;
  submittedValues: HotelSearchParams | null;
  results: HotelSearchQueryState;
  filters: HotelSearchFilters;
}

const initialState: HotelSearchState = {
  formValues: {
    location: 'Santiago', //TODO: This should be the lastest search location from the user (session storage)
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    adults: 2,
  },
  submittedValues: null,
  results: {
    data: [],
    loading: false,
    error: null,
  },
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
    updateFormValues: (state, action: PayloadAction<Partial<HotelSearchParams>>) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    updateSubmittedValues: (state, action: PayloadAction<HotelSearchParams>) => {
      state.submittedValues = action.payload;
    },
    submitSearch: (state) => {
      state.submittedValues = { ...state.formValues };
    },
    resetFormValues: (state) => {
      state.formValues = { ...initialState.formValues };
    },
    clearSearch: (state) => {
      state.submittedValues = null;
      state.results = { data: [], loading: false, error: null };
    },
    updateResults: (state, action: PayloadAction<HotelSearchQueryState>) => {
      state.results = { ...state.results, ...action.payload };
    },
    updateFilters: (state, action: PayloadAction<Partial<HotelSearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.results.error = action.payload;
    },
    resetHotelSearch: () => initialState,
    clearResults: (state) => {
      state.results = { data: [], loading: false, error: null };
    },
  },
});

export const {
  updateFormValues,
  updateSubmittedValues,
  submitSearch,
  resetFormValues,
  clearSearch,
  setError,
  resetHotelSearch,
  clearResults,
  updateResults,
  updateFilters,
  resetFilters,
} = hotelSearchSlice.actions;

export const selectFormValues = (state: RootState) => state.hotelSearch.formValues;

export const selectSubmittedValues = (state: RootState) => state.hotelSearch.submittedValues;

export const selectFilters = (state: RootState) => state.hotelSearch.filters;
export const selectHotelResults = (state: RootState) => state.hotelSearch.results.data;
export const selectHotelLoading = (state: RootState) => state.hotelSearch.results.loading;
export const selectHotelError = (state: RootState) => state.hotelSearch.results.error;

export default hotelSearchSlice.reducer;
