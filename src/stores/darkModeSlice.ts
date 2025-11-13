import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores/store';

interface DarkModeState {
  isDarkMode: boolean;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem('darkMode');
  if (stored !== null) {
    return stored === 'true';
  }

  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: DarkModeState = {
  isDarkMode: getInitialDarkMode(),
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', String(action.payload));
      }
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', String(state.isDarkMode));
      }
    },
  },
});

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions;

export const selectIsDarkMode = (state: RootState) => state.darkMode.isDarkMode;

export default darkModeSlice.reducer;
