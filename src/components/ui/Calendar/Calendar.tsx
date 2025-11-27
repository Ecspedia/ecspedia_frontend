'use client';
import { ScrollableList } from '@/components/shared';
import { DateHelper } from '@/utils/dateHelpers';
import { useMemo } from 'react';
import Button from '../Button/Button';
import CalendarHeader from './CalendarHeader';
import DaysGrid from './DaysGrid';
import { useCalendarState } from './hooks';
import MonthNavigator from './MonthNavigator';
import { CalendarContext } from './utils/calendarContext';
import WeekdayHeader from './WeekdayHeader';

interface CalendarProps {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  onClose?: () => void;
  variant?: 'default' | 'compact';
  isMobile?: boolean;
}

function Calendar({ initialStartDate, initialEndDate, onDateRangeSelect, onClose, variant = 'default', isMobile }: CalendarProps) {
  const { contextValue } = useCalendarState({
    initialStartDate,
    initialEndDate,
    onDateRangeSelect,
    onClose,
    isMobile
  });

  const listOfDates = useMemo(() => {
    const dates: { date: Date; monthName: string }[] = [];
    const currentDate = DateHelper.getToday();
    for (let i = 0; i < 20; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      dates.push({
        date: monthDate,
        monthName: DateHelper.getMonthName(monthDate)
      });
    }
    return dates;
  }, []);

  if (variant === 'compact') {
    return (
      <CalendarContext.Provider value={contextValue}>
        <div className="bg-overlay shadow-lg flex min-w-[max(100%,300px)] overflow-y-auto max-h-[80vh] flex-col rounded-lg p-2 lg:p-4 animate-[expandDown_130ms_ease-out] origin-top-left">
          <CalendarHeader />
          <ScrollableList
            items={listOfDates}
            direction="vertical"
            batchSize={4}
            renderItem={(date) => (
              <div className="flex flex-col gap-4" key={date.date.toISOString()}>
                <MonthNavigator>
                  <MonthNavigator.MonthText monthName={date.monthName} />
                </MonthNavigator>
                <WeekdayHeader />
                <DaysGrid date={date.date} />
              </div>
            )}
          />


          {/* <Button text={'Done'} variant="secondary" className="mt-5 w-20 self-end p-3" onClick={contextValue.actions.handleDone} disabled={!contextValue.actions.isValid}></Button> */}
        </div>
      </CalendarContext.Provider>
    );
  }


  return (
    <CalendarContext.Provider value={contextValue}>
      <div className="bg-overlay shadow-lg flex min-w-[max(100%,600px)]  flex-col rounded-lg p-2 animate-[expandDown_130ms_ease-out] origin-top-left">
        <CalendarHeader />
        <div className="flex gap-2">
          <div className="flex flex-col gap-4 flex-1">
            <MonthNavigator>
              <MonthNavigator.PrevButton />
              <MonthNavigator.MonthText monthName={contextValue.state.leftMonthName} />
            </MonthNavigator>
            <WeekdayHeader />
            <DaysGrid date={contextValue.state.leftDate} />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <MonthNavigator>
              <MonthNavigator.MonthText monthName={contextValue.state.rightMonthName} />
              <MonthNavigator.NextButton />
            </MonthNavigator>
            <WeekdayHeader />
            <DaysGrid date={contextValue.state.rightDate} />
          </div>
        </div>
        <Button text={'Done'} variant="secondary" className="mt-5 w-20 self-end p-3" onClick={contextValue.actions.handleDone} disabled={!contextValue.actions.isValid}></Button>
      </div>
    </CalendarContext.Provider>
  );
}

Calendar.DaysGrid = DaysGrid;
Calendar.WeekdayHeader = WeekdayHeader;
Calendar.Header = CalendarHeader;
Calendar.MonthNavigator = MonthNavigator;

export default Calendar;
