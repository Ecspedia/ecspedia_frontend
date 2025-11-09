import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores/store';

interface DarkModeState {
  isDarkMode: boolean;
}

const initialState: DarkModeState = {
  isDarkMode: false,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions;

export const selectIsDarkMode = (state: RootState) => state.darkMode.isDarkMode;

export default darkModeSlice.reducer;

