import SimpleCalendar from "@/components/ui/SimpleCalendar";
import TextField from "@/components/ui/TextField";

interface DateRangeTextFieldProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  value: Date | null;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export default function DateRangeTextField(
  dateRangeTextFieldProps: DateRangeTextFieldProps,
) {
  const { isExpanded, onToggleExpanded, value, onChange, onClose } =
    dateRangeTextFieldProps;

  return (
    <div className="relative">
      {isExpanded && (
        <div className="w-80">
          <SimpleCalendar value={value} onChange={onChange} onClose={onClose} />
        </div>
      )}
      <div className={isExpanded ? "invisible" : ""}>
        <TextField
          value={value?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          placeholder="Dates"
          onClick={onToggleExpanded}
          readOnly={false}
        />
      </div>
    </div>
  );
}
