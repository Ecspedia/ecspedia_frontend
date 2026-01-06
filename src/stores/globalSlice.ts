import type { HotelResponseDto } from '@/types/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface HotelSearchParams {
  location: string;
  startDate: string | null;
  endDate: string | null;
  adults: number;
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
}

interface GlobalState {
  selectedHotel: HotelResponseDto | null;
  selectedMapHotel: HotelResponseDto | null;
  selectedHotelForBooking: HotelResponseDto | null;
  chatScrollPosition: number;
  hotelSearch: HotelSearchState;
}

const createInitialHotelSearchState = (): HotelSearchState => ({
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
});

const initialState: GlobalState = {
  selectedHotel: null,
  selectedMapHotel: null,
  selectedHotelForBooking: null,
  chatScrollPosition: 0,
  hotelSearch: createInitialHotelSearchState(),
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
    setChatScrollPosition: (state, action: PayloadAction<number>) => {
      state.chatScrollPosition = action.payload;
    },
    resetChatScrollPosition: (state) => {
      state.chatScrollPosition = 0;
    },
    updateFormValues: (state, action: PayloadAction<Partial<HotelSearchParams>>) => {
      state.hotelSearch.formValues = { ...state.hotelSearch.formValues, ...action.payload };
    },
    updateSubmittedValues: (state, action: PayloadAction<HotelSearchParams>) => {
      state.hotelSearch.submittedValues = action.payload;
    },
    submitSearch: (state) => {
      state.hotelSearch.submittedValues = { ...state.hotelSearch.formValues };
    },
    resetFormValues: (state) => {
      state.hotelSearch.formValues = { ...initialState.hotelSearch.formValues };
    },
    clearSearch: (state) => {
      state.hotelSearch.submittedValues = null;
      state.hotelSearch.results = { data: [], loading: false, error: null };
    },
    updateResults: (state, action: PayloadAction<HotelSearchQueryState>) => {
      state.hotelSearch.results = { ...state.hotelSearch.results, ...action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.hotelSearch.results.error = action.payload;
    },
    resetHotelSearch: (state) => {
      state.hotelSearch = createInitialHotelSearchState();
    },
    clearResults: (state) => {
      state.hotelSearch.results = { data: [], loading: false, error: null };
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
  setChatScrollPosition,
  resetChatScrollPosition,
  updateFormValues,
  updateSubmittedValues,
  submitSearch,
  resetFormValues,
  clearSearch,
  setError,
  resetHotelSearch,
  clearResults,
  updateResults,
} = globalSlice.actions;

export const selectSelectedHotel = (state: RootState) => state.global.selectedHotel;
export const selectSelectedHotelId = (state: RootState) => state.global.selectedHotel?.id ?? null;
export const selectSelectedMapHotel = (state: RootState) => state.global.selectedMapHotel;
export const selectSelectedHotelForBooking = (state: RootState) =>
  state.global.selectedHotelForBooking;
export const selectChatScrollPosition = (state: RootState) => state.global.chatScrollPosition;
export const selectFormValues = (state: RootState) => state.global.hotelSearch.formValues;
export const selectSubmittedValues = (state: RootState) => state.global.hotelSearch.submittedValues;
export const selectHotelResults = (state: RootState) => state.global.hotelSearch.results.data;
export const selectHotelLoading = (state: RootState) => state.global.hotelSearch.results.loading;
export const selectHotelError = (state: RootState) => state.global.hotelSearch.results.error;

export default globalSlice.reducer;
