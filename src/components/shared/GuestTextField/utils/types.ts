'use client';
import { createContext } from 'react';

export type GuestSelectorContextType = {
  adults: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleApply: () => void;
  isValid: boolean;
  min: number;
  max: number;
};

export const GuestSelectorContext = createContext<GuestSelectorContextType | undefined>(undefined);
