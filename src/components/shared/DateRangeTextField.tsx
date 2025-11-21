'use client';
import { Calendar } from '@/components/ui';
import { useIsMobile } from '@/hooks';
import { DateHelper } from '@/utils/dateHelpers';
import { CalendarIcon } from 'lucide-react';
import { ExpandableTextField } from './ExpandableTextField';


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
    return `${DateHelper.formatDateMonthDay(startDate)} - ${DateHelper.formatDateMonthDay(endDate)}`;
  };
  const isMobile = useIsMobile();
  const variant = isMobile ? 'compact' : 'default';

  return (
    <ExpandableTextField
      value={formatDateRange()}
      placeholder={placeholder}
      isOpen={isCalendarOpen}
      onOpen={onOpenCalendar}
      readOnly={false}
      icon={CalendarIcon}
      popup={
        <Calendar
          initialStartDate={startDate}
          initialEndDate={endDate}
          onDateRangeSelect={onDateRangeSelect}
          onClose={onCalendarClose}
          variant={variant}
        />
      }
    />
  );
}

