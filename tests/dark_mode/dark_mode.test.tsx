import { it, describe, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer, {
  setDarkMode,
  toggleDarkMode,
  selectIsDarkMode,
} from '@/components/features/dark-mode/store/darkModeSlice';
import { RootState } from '@/app/store';
import DarkModeToggle from '@/components/features/dark-mode/DarkModeToggle';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia (needed by useDarkMode hook to check system preference)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Helper function to render components with Redux store
const renderWithRedux = (
  component: React.ReactElement,
  store: ReturnType<typeof configureStore>
) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('LocalStorage Tests', () => {
  it('should store "dark" in localStorage when dark mode is enabled', () => {
    localStorage.setItem('darkMode', 'dark');
    expect(localStorage.getItem('darkMode')).toBe('dark');
  });
  it('should store "light" in localStorage when light mode is enabled', () => {
    localStorage.setItem('darkMode', 'light');
    expect(localStorage.getItem('darkMode')).toBe('light');
  });
});

describe('Redux Tests for setDarkMode', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        darkMode: darkModeReducer,
      },
    });
  });

  it('should set dark mode to true when setDarkMode is called with true', () => {
    store.dispatch(setDarkMode(true));
    expect((store.getState() as RootState).darkMode.isDarkMode).toBe(true);
  });
  it('should set dark mode to false when setDarkMode is called with false', () => {
    store.dispatch(setDarkMode(false));
    expect((store.getState() as RootState).darkMode.isDarkMode).toBe(false);
  });
  it('should toggle dark mode when toggleDarkMode is called', () => {
    store.dispatch(toggleDarkMode());
    expect((store.getState() as RootState).darkMode.isDarkMode).toBe(true);
    store.dispatch(toggleDarkMode());
    expect((store.getState() as RootState).darkMode.isDarkMode).toBe(false);
  });
});

describe('Document Class Tests', () => {
  beforeEach(() => {
    // Remove any existing "dark" class before each test
    document.documentElement.classList.remove('dark');
  });
  it('should not have "dark" class by default', () => {
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

});

describe('Dark Mode Toggle component test', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();

    // Create fresh store
    store = configureStore({
      reducer: { darkMode: darkModeReducer },
    });
  });

  it('should render the toggle button', () => {
    renderWithRedux(<DarkModeToggle />, store);
    const button = screen.getByRole('switch');
    expect(button).toBeInTheDocument();
  });
  it('should render the sun icon by default (light mode)', () => {
    renderWithRedux(<DarkModeToggle />, store);
    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();
  });

  it('should render the moon icon when dark mode is enabled', async () => {
    // Set localStorage to dark BEFORE rendering (the hook reads this on mount)
    localStorage.setItem('darkMode', 'dark');

    renderWithRedux(<DarkModeToggle />, store);

    // Wait for the component to update based on localStorage
    await waitFor(() => {
      const moonIcon = screen.getByTestId('moon-icon');
      expect(moonIcon).toBeInTheDocument();
    });
  });

  describe('Integration Test', () => {
    it('should toggle to dark mode when the toggle button is clicked and localStorage is light', async () => {
      localStorage.setItem('darkMode', 'light');
      renderWithRedux(<DarkModeToggle />, store);
      const button = screen.getByRole('switch');
      fireEvent.click(button);
      expect(localStorage.getItem('darkMode')).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);


    });
    it('should toggle to light mode when the toggle button is clicked and localStorage is dark', () => {
      localStorage.setItem('darkMode', 'dark');
      renderWithRedux(<DarkModeToggle />, store);
      const button = screen.getByRole('switch');
      fireEvent.click(button);
      expect(localStorage.getItem('darkMode')).toBe('light');
      expect(document.documentElement.classList).toHaveLength(0);
    });

  });


});


