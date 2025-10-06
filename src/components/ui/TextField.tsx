"use client";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface TextFieldProps {
  placeholder?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function TextField({
  placeholder,
  onClick,
  icon: Icon = CalendarIcon,
  value,
  onChange,
  readOnly = false,
}: TextFieldProps) {
  const hasValue = value && value.length > 0;

  return (
    <div
      onClick={onClick}
      className="border-primary relative rounded-lg border-1 px-4"
    >
      <label
        className={`text-primary absolute left-12 transition-[transform] duration-200 ${
          hasValue
            ? "top-1 text-xs"
            : "top-1/2 -translate-y-1/2 text-base opacity-50"
        }`}
      >
        {placeholder}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-2 w-full px-8 py-3 focus:outline-none"
        readOnly={readOnly}
        onFocus={(e) => readOnly && e.target.blur()}
      />
      <Icon className="text-primary absolute top-1/2 h-6 w-6 -translate-y-1/2" />
    </div>
  );
}
