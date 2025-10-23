'use client';

import TextField from '@/components/ui/TextField';

import ExpandedLocationTextField from './ExpandedLocationTextField';
import { MapPinIcon } from 'lucide-react';

interface LocationTextFieldProps {
  placeholder: string;
  onChange: (location: string) => void;
  value: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function LocationTextField(locationTextFieldProps: LocationTextFieldProps) {
  const { placeholder, onChange, value, isOpen, onOpen, onClose } =
    locationTextFieldProps;

  const handleLocationSelect = (location: string) => {
    onChange(location);
    onClose();
  };

  return (
    <div className="relative w-full">
      {isOpen && (
        <div className="absolute top-0 left-0 z-50 w-full">
          <ExpandedLocationTextField
            onLocationSelect={handleLocationSelect}
            placeholder={placeholder}
            onClose={onClose}
          />
        </div>
      )}
      <TextField
        placeholder={placeholder}
        onClick={onOpen}
        icon={MapPinIcon}
        value={value}
        readOnly={false}
      />
    </div>
  );
}
