import { useContext } from 'react';
import { CalendarContext } from '../utils/calendarContext';

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within Calendar');
  }
  return context;
}
