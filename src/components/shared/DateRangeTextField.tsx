import SimpleCalendar from "@/components/ui/SimpleCalendar";
import TextField from "@/components/ui/TextField";

interface DateRangeTextFieldProps {
  isCalendarOpen: boolean;
  onOpenCalendar: () => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onCalendarClose: () => void;
  placeholder?: string;
}

export default function DateRangeTextField(
  dateRangeTextFieldProps: DateRangeTextFieldProps,
) {
  const {
    isCalendarOpen,
    onOpenCalendar,
    selectedDate,
    onDateSelect,
    onCalendarClose,
    placeholder = "Dates",
  } = dateRangeTextFieldProps;

  return (
    <div className="relative">
      {isCalendarOpen && (
        <div className="absolute top-0 left-0 z-50">
          <SimpleCalendar value={selectedDate} onChange={onDateSelect} onClose={onCalendarClose} />
        </div>
      )}
      <TextField
        value={selectedDate?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        placeholder={placeholder}
        onClick={onOpenCalendar}
        readOnly={false}
      />
    </div>
  );
}
