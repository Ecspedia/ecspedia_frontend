import { RootState } from '@/stores/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// TODO: Restore hotelService - File was moved/deleted
// import { hotelService } from '../api/hotelService';
import { Hotel } from '@/types/api';

interface HotelSearchState {
  location: string;
  startDate: string | null;
  endDate: string | null;
  adults: number;
  results: Hotel[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelSearchState = {
  location: '',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  adults: 2,
  results: [],
  loading: false,
  error: null,
};

export const searchHotels = createAsyncThunk(
  'hotelSearch/searchHotels',
  async (location: string, { rejectWithValue }) => {
    try {
      // TODO: Restore hotelService.getHotelsByLocation when hotelService is restored
      // const hotels = await hotelService.getHotelsByLocation(location);
      // return hotels;
      throw new Error('hotelService not available - service file was moved/deleted');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch hotels';
      return rejectWithValue(errorMessage);
    }
  }
);

const hotelSearchSlice = createSlice({
  name: 'hotelSearch',
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
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetHotelSearch: () => initialState,
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // TODO: Uncomment when hotelService is restored
      // .addCase(searchHotels.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.results = action.payload;
      //   state.error = null;
      // })
      .addCase(searchHotels.rejected, (state, action) => {
        state.loading = false;
        state.results = [];
        state.error = action.payload as string;
      });
  },
});

export const {
  setLocation,
  setStartDate,
  setEndDate,
  setAdults,
  setError,
  resetHotelSearch,
  clearResults,
} = hotelSearchSlice.actions;

// Selectors
export const selectLocation = (state: RootState) => state.hotelSearch.location;
export const selectStartDate = (state: RootState) => state.hotelSearch.startDate;
export const selectEndDate = (state: RootState) => state.hotelSearch.endDate;
export const selectAdults = (state: RootState) => state.hotelSearch.adults;
export const selectHotelResults = (state: RootState) => state.hotelSearch.results;
export const selectHotelLoading = (state: RootState) => state.hotelSearch.loading;
export const selectHotelError = (state: RootState) => state.hotelSearch.error;

export default hotelSearchSlice.reducer;
