import { cn } from '@/lib/utils';
import { useCalendarContext } from './hooks';
import { DateHelper } from './utils/dateHelpers';

interface DayCellProps {
  day: number;
  date: Date;
  currentYear: number;
  currentMonth: number;
  isDarkMode: boolean;
  index: number;
}

export default function DayCell({ day, date, currentYear, currentMonth, isDarkMode, index }: DayCellProps) {
  const { state, actions } = useCalendarContext();

  const currentDate = new Date(currentYear, currentMonth, day);
  const today = new Date();


  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const isLastDayOfMonth = day === daysInMonth;
  const isFirstDayOfMonth = day === 1;

  const isToday = DateHelper.isToday(currentDate);
  console.log('isToday', currentDate, DateHelper.getToday());
  const isDisabled = DateHelper.isLessThanToday(currentDate);

  const isStartDate = DateHelper.isDateEqual(state.startDate, currentDate);
  const isEndDate = DateHelper.isDateEqual(state.endDate, currentDate);
  const isBoundaryDate = isStartDate || isEndDate;
  const isTodayWithoutSelection = isToday && !isStartDate;
  const isInRange = DateHelper.isInRange(currentDate, state.startDate, state.endDate);

  const dayBackgroundOnRange = isDarkMode ? 'bg-brand-secondary/30' : 'bg-brand-secondary/15';
  const hoverBorder = isDarkMode ? 'hover:border-white' : 'hover:border-black';

  const getBackgroundClass = () => {
    if (!isStartDate && !isEndDate && !isInRange) {
      return 'bg-transparent';
    }
    if (state.startDate !== null && state.endDate === null) {
      return 'bg-transparent';
    }
    if (isLastDayOfMonth && isEndDate) {
      return isDarkMode
        ? 'bg-gradient-to-r from-brand-secondary/30 to-transparent'
        : 'bg-gradient-to-r from-brand-secondary/15 to-transparent';
    }
    if (isLastDayOfMonth && isInRange) {
      return isDarkMode
        ? 'bg-gradient-to-r from-brand-secondary/30 to-transparent'
        : 'bg-gradient-to-r from-brand-secondary/15 to-transparent';
    }

    if (isFirstDayOfMonth && isInRange) {
      return isDarkMode
        ? 'bg-gradient-to-l from-brand-secondary/30 to-transparent'
        : 'bg-gradient-to-l from-brand-secondary/15 to-transparent';
    }

    return dayBackgroundOnRange;
  };

  return (
    <div key={index} className="relative h-10">
      <div
        className={cn('absolute inset-0', getBackgroundClass(), {
          'left-1/2': isStartDate && !isFirstDayOfMonth,
          'right-1/2': isEndDate && !isLastDayOfMonth,
        })}
      ></div>

      <button
        type="button"
        disabled={isDisabled}
        className={cn(
          'relative z-10 flex w-full h-10 mx-auto items-center justify-center hover:border-2 rounded-full',
          hoverBorder,
          {
            'bg-brand-secondary text-primary font-bold': isBoundaryDate,
            'text-white': !isDarkMode && isBoundaryDate,
            'opacity-40 cursor-not-allowed': isDisabled,
            'cursor-pointer': !isDisabled,
            'scale-75 bg-brand-secondary text-white': isTodayWithoutSelection,
          }
        )}
        onClick={() => {
          if (!isDisabled) {
            actions.handleDayClick(day, date);
          }
        }}
      >
        {day}
      </button>
    </div>
  );
}
