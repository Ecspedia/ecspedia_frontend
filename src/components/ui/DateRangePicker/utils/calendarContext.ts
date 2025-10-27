import { createContext } from 'react';

export type CalendarState = {
  startDate: Date | null;
  endDate: Date | null;
  leftDate: Date;
  rightDate: Date;
  leftMonthName: string;
  rightMonthName: string;
};

export type CalendarActions = {
  handleDayClick: (day: number, monthDate: Date) => void;
  handlePrevLeft: () => void;
  handleNextRight: () => void;
  handleDone: () => void;
};

export type CalendarContextType = {
  state: CalendarState;
  actions: CalendarActions;
};

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);
