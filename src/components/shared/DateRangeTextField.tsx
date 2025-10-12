import SimpleCalendar from "@/components/ui/SimpleCalendar";
import TextField from "@/components/ui/TextField";

interface DateRangeTextFieldProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  value: Date | null;
  onChange: (date: Date) => void;
  onClose: () => void;
  placeholder?: string;
}

export default function DateRangeTextField(
  dateRangeTextFieldProps: DateRangeTextFieldProps,
) {
  const {
    isExpanded,
    onToggleExpanded,
    value,
    onChange,
    onClose,
    placeholder = "Dates",
  } = dateRangeTextFieldProps;

  return (
    <div className="relative">
      {isExpanded && (
        <div className="absolute top-0 left-0 z-50">
          <SimpleCalendar value={value} onChange={onChange} onClose={onClose} />
        </div>
      )}
      <TextField
        value={value?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        placeholder={placeholder}
        onClick={onToggleExpanded}
        readOnly={false}
      />
    </div>
  );
}
