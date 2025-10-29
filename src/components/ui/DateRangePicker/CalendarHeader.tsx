import { ArrowRight } from 'lucide-react';
import { useCalendarContext } from './hooks';
import { DateHelper } from './utils/dateHelpers';

export default function CalendarHeader() {
  const { state } = useCalendarContext();

  return (
    <div className="flex items-center gap-4 p-4">
      <SelectedDateText date={DateHelper.formatDate(state.startDate)} isStartDate />
      <ArrowRight className="text-primary" size={24} />
      <SelectedDateText date={DateHelper.formatDate(state.endDate)} isStartDate={false} />
    </div>
  );
}

const SelectedDateText = ({ date, isStartDate }: { date: string; isStartDate: boolean }) => {
  return (
    <div
      className={`text-primary text-2xl ${isStartDate ? 'border-brand-secondary border-b-2 pb-2' : ''}`}
    >
      {date}
    </div>
  );
};
