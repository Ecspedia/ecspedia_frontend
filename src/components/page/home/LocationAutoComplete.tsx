"use client";
import { useState } from "react";
import TextField from "@/components/ui/TextField";
import { MapPinIcon } from "@heroicons/react/24/outline";
import ExpandedLocationField from "./ExpandedLocationField";

interface LocationAutocompleteProps {
  placeholder: string | "";
  onLocationSelect?: (location: string) => void;
}

export default function LocationAutoComplete(
  locationAutocompleteProps: LocationAutocompleteProps
) {
  const { placeholder = "", onLocationSelect } = locationAutocompleteProps;
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState("");
  const handleTextFieldClick = () => {
    setIsExpanded(true);
  };
  const handleLocationSelect = (location: string) => {
    setValue(location);

    setIsExpanded(false);
  };
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="relative">
      {isExpanded && (
        <ExpandedLocationField
          onLocationSelect={handleLocationSelect}
          placeholder={placeholder}
          onClose={() => setIsExpanded(false)}
        />
      )}
      <div className={isExpanded ? "invisible" : ""}>
        <TextField
          placeholder={placeholder}
          onClick={handleTextFieldClick}
          icon={MapPinIcon}
          value={value}
          onChange={handleChange}
          readOnly={false}
        />
      </div>
    </div>
  );
}
