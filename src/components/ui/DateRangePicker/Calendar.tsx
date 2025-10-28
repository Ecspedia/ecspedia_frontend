import CalendarHeader from './CalendarHeader';
import MonthNavigator from './MonthNavigator';
import WeekdayHeader from './WeekdayHeader';
import DaysGrid from './DaysGrid';
import Button from '../Button';
import { CalendarContext } from './utils/calendarContext';
import { useCalendarState } from './hooks';

interface CalendarProps {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  onClose?: () => void;
}

function Calendar({ initialStartDate, initialEndDate, onDateRangeSelect, onClose }: CalendarProps) {
  const { contextValue } = useCalendarState({
    initialStartDate,
    initialEndDate,
    onDateRangeSelect,
    onClose

  });



  return (
    <CalendarContext.Provider value={contextValue}>
      <div className="bg-overlay shadow-lg flex w-fit flex-col rounded-lg p-2 animate-[expandDown_130ms_ease-out] origin-top-left">
        <CalendarHeader />
        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-4">
            <MonthNavigator>
              <MonthNavigator.PrevButton />
              <MonthNavigator.MonthText monthName={contextValue.state.leftMonthName} />
            </MonthNavigator>
            <WeekdayHeader />
            <DaysGrid date={contextValue.state.leftDate} />
          </div>
          <div className="flex flex-col gap-4">
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
