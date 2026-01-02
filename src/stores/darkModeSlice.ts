import type { RootState } from '@/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
  isDarkMode: boolean;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  //Instead of using localStorage, check document.documentElement.classList.contains('dark'),
  //Because we added a loaded script to performn the dark mode sync at the start

  return document.documentElement.classList.contains('dark');
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
