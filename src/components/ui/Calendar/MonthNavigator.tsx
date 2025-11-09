import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import { useCalendarContext } from './hooks';

interface MonthNavigatorProps {
  children: ReactNode;
  className?: string;
}

function MonthNavigator({ children, className }: MonthNavigatorProps) {
  return <div className={`${className} flex items-center gap-2`}>{children}</div>;
}

function PrevButton() {
  const { actions } = useCalendarContext();

  return (
    <button
      type="button"
      onClick={actions.handlePrevLeft}
      className="text-primary cursor-pointer transition-opacity hover:opacity-80"
      aria-label="Previous month"
    >
      <ChevronLeft size={24} />
    </button>
  );
}

function NextButton() {
  const { actions } = useCalendarContext();

  return (
    <button
      type="button"
      onClick={actions.handleNextRight}
      className="text-primary cursor-pointer transition-opacity hover:opacity-80"
      aria-label="Next month"
    >
      <ChevronRight size={24} />
    </button>
  );
}

interface MonthTextProps {
  monthName: string;
}

function MonthText({ monthName }: MonthTextProps) {
  return <span className="text-primary flex-1 text-center text-lg font-medium">{monthName}</span>;
}

MonthNavigator.PrevButton = PrevButton;
MonthNavigator.NextButton = NextButton;
MonthNavigator.MonthText = MonthText;

export default MonthNavigator;
