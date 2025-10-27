import { selectIsDarkMode } from '@/components/features/dark-mode';
import { useAppSelector } from '@/hooks';
import { DateHelper } from './utils/dateHelpers';
import DayCell from './DayCell';

interface CalendarDayProps {
  date: Date;
}

export default function CalendarDay({ date }: CalendarDayProps) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const renderDay = (day: number | null, index: number) => {
    if (!day) {
      return <div key={index} className="h-10"></div>;
    }

    return (
      <DayCell
        key={index}
        day={day}
        date={date}
        currentYear={currentYear}
        currentMonth={currentMonth}
        isDarkMode={isDarkMode}
        index={index}
      />
    );
  };

  const days = DateHelper.getDaysInMonth(currentYear, currentMonth);

  return (
    <div className="grid gap-0 gap-y-[1px]" style={{ gridTemplateColumns: 'repeat(7, 40px)' }}>
      {days.map((day, index) => renderDay(day, index))}
    </div>
  );
}
