import TextField from '@/components/ui/TextField';
import { Calendar } from '@/components/ui/DateRangePicker';
import { DateHelper } from '@/components/ui/DateRangePicker/utils/dateHelpers';

interface DateRangeTextFieldProps {
  isCalendarOpen: boolean;
  onOpenCalendar: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateRangeSelect: (startDate: Date, endDate: Date) => void;
  onCalendarClose: () => void;
  placeholder?: string;
}

export default function DateRangeTextField(dateRangeTextFieldProps: DateRangeTextFieldProps) {
  const {
    isCalendarOpen,
    onOpenCalendar,
    startDate,
    endDate,
    onDateRangeSelect,
    onCalendarClose,
    placeholder = 'Dates',
  } = dateRangeTextFieldProps;

  const formatDateRange = () => {
    if (!startDate || !endDate) return '';
    return `${DateHelper.formatDate(startDate)} - ${DateHelper.formatDate(endDate)}`;
  };

  return (
    <div className="relative">
      {isCalendarOpen && (
        <div className="absolute top-0 left-0 z-50">
          <Calendar
            initialStartDate={startDate}
            initialEndDate={endDate}
            onDateRangeSelect={onDateRangeSelect}
            onClose={onCalendarClose}
          />
        </div>
      )}
      <TextField
        value={formatDateRange()}
        placeholder={placeholder}
        onClick={onOpenCalendar}
        readOnly={false}
      />
    </div>
  );
}

/* <SimpleCalendar value={selectedDate} onChange={onDateSelect} onClose={onCalendarClose} /> */

/* <SimpleCalendar value={selectedDate} onChange={onDateSelect} onClose={onCalendarClose} /> */
