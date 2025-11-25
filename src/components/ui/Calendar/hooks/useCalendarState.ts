import { useState } from 'react';
import { CalendarContextType } from '../utils/calendarContext';
import { DateHelper } from '@/utils/dateHelpers';
import { useFullscreenPopup } from '@/components/shared/ExpandableTextField/FullscreenPopupContext';

interface UseCalendarStateProps {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function useCalendarState(props?: UseCalendarStateProps) {
  const {
    initialStartDate = DateHelper.getToday(),
    initialEndDate = DateHelper.pastTomorrow(),
    onDateRangeSelect,
    onClose,
    isMobile,
  } = props || {};

  const { setPopup } = useFullscreenPopup();

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [leftDate, setLeftDate] = useState(initialStartDate || DateHelper.getToday());

  const [rightDate, setRightDate] = useState(() => {
    //should be always leftDate + 1 month.
    return DateHelper.addOneMonth(leftDate);
  });

  const handleDone = () => {
    if (isValid && startDate && endDate) {
      if (isMobile) {
        setPopup(null);
      }
      onDateRangeSelect?.(startDate, endDate);
      onClose?.();
    }
  };

  const handleUpdateDateRange = (startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      onDateRangeSelect?.(startDate, endDate);
    }
  };

  const handlePrevLeft = () => {
    const currentLeftDate = new Date(leftDate);
    const currentRightDate = new Date(rightDate);

    currentLeftDate.setMonth(currentLeftDate.getMonth() - 1);
    currentRightDate.setMonth(currentRightDate.getMonth() - 1);

    setLeftDate(currentLeftDate);
    setRightDate(currentRightDate);
  };

  const handleNextRight = () => {
    const currentLeftDate = new Date(leftDate);
    const currentRightDate = new Date(rightDate);

    currentLeftDate.setMonth(currentLeftDate.getMonth() + 1);
    currentRightDate.setMonth(currentRightDate.getMonth() + 1);

    setLeftDate(currentLeftDate);
    setRightDate(currentRightDate);
  };

  const handleDayClick = (day: number, monthDate: Date) => {
    const selectedDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);

    //Case 1: unselected range, is happen when start date and end date are set and selected date is equal to start date

    if (startDate && endDate && DateHelper.isSameDay(startDate, selectedDate)) {
      //Case 1: if start date and end date(+1) are consecutive -> unselect
      if (DateHelper.getDaysDifference(startDate, endDate) === 1) {
        setStartDate(null);
        setEndDate(null);
        return;
      }
    }
    //Case 2: startDate is not set and endDate is not set
    if (!startDate && !endDate) {
      setStartDate(selectedDate);
      setEndDate(DateHelper.addOneDay(selectedDate));
      handleUpdateDateRange(selectedDate, DateHelper.addOneDay(selectedDate));

      return;
    }
    //Case 3: startDate is set and endDate is not set
    if (startDate && !endDate) {
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else {
        setEndDate(selectedDate);
        handleUpdateDateRange(startDate, selectedDate);
      }
      return;
    }
    //Case 4: startDate is set and endDate is set
    if (startDate && endDate) {
      //Case 4.1: if start date and end date(+1) are consecutive but the selected date is not between start date and end date
      if (DateHelper.getDaysDifference(startDate, endDate) === 1) {
        if (selectedDate < startDate) {
          setStartDate(selectedDate);
          setEndDate(DateHelper.addOneDay(selectedDate));
          handleUpdateDateRange(selectedDate, DateHelper.addOneDay(selectedDate));
        } else {
          setEndDate(selectedDate);
          handleUpdateDateRange(startDate, selectedDate);
        }
        return;
      }
      //Case 4.2: if start date and end date(+1) are not consecutive but the selected date is not between start date and end date
      else {
        setStartDate(selectedDate);
        setEndDate(DateHelper.addOneDay(selectedDate));
        handleUpdateDateRange(selectedDate, DateHelper.addOneDay(selectedDate));
      }
      return;
    }
  };
  const isValid = startDate !== null && endDate !== null;
  const leftMonthName = DateHelper.getMonthName(leftDate);
  const rightMonthName = DateHelper.getMonthName(rightDate);

  const contextValue: CalendarContextType = {
    state: {
      startDate,
      endDate,
      leftDate,
      rightDate,
      leftMonthName,
      rightMonthName,
    },
    actions: {
      handleDayClick,
      handlePrevLeft,
      handleNextRight,
      handleDone,
      isValid,
    },
  };

  return {
    contextValue,
  };
}
