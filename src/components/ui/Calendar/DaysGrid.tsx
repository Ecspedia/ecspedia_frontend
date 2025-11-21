import { useAppSelector } from '@/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { DateHelper } from '@/utils/dateHelpers';
import DayCell from './DayCell';

interface DaysGridProps {
  date: Date;
}

export default function DaysGrid({ date }: DaysGridProps) {
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
    <div className="grid gap-0 gap-y-px w-full grid-cols-7" >
      {days.map((day, index) => renderDay(day, index))}
    </div>
  );
}
