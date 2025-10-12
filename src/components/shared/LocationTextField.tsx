"use client";

import TextField from "@/components/ui/TextField";
import { MapPinIcon } from "@heroicons/react/24/outline";
import ExpandedLocationTextField from "./ExpandedLocationTextField";

interface LocationAutocompleteProps {
  placeholder: string;
  onLocationSelect: (location: string) => void;
  value: string;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onClose: () => void;
}

export default function LocationTextField(
  locationAutocompleteProps: LocationAutocompleteProps,
) {
  const {
    placeholder,
    onLocationSelect,
    value,
    isExpanded,
    onToggleExpanded,
    onClose,
  } = locationAutocompleteProps;

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    onClose();
  };

  return (
    <div className="relative w-full">
      {isExpanded && (
        <div className="absolute top-0 left-0 w-full z-50">
          <ExpandedLocationTextField
            onLocationSelect={handleLocationSelect}
            placeholder={placeholder}
            onClose={onClose}
          />
        </div>
      )}
      <TextField
        placeholder={placeholder}
        onClick={onToggleExpanded}
        icon={MapPinIcon}
        value={value}
        readOnly={false}
      />
    </div>
  );
}
