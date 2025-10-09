"use client";
import { useState } from "react";
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
    <div className="relative">
      {isExpanded && (
        <ExpandedLocationTextField
          onLocationSelect={handleLocationSelect}
          placeholder={placeholder}
          onClose={onClose}
        />
      )}
      <div className={isExpanded ? "invisible" : ""}>
        <TextField
          placeholder={placeholder}
          onClick={onToggleExpanded}
          icon={MapPinIcon}
          value={value}
          readOnly={false}
        />
      </div>
    </div>
  );
}
