'use client';

import { ExpandableTextField } from '@/components/shared/ExpandableTextField';
import { MapPinIcon } from 'lucide-react';
import LocationSelector from './LocationSelector';

interface LocationTextFieldProps {
  placeholder: string;
  value: string;
  isOpen: boolean;
  onChange: (location: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export default function LocationTextField(locationTextFieldProps: LocationTextFieldProps) {
  const { placeholder, onChange, value, isOpen, onOpen, onClose } = locationTextFieldProps;

  const handleLocationSelect = (location: string) => {
    onChange(location);
    onClose();
  };

  return (
    <ExpandableTextField
      value={value}
      placeholder={placeholder}
      icon={MapPinIcon}
      isOpen={isOpen}
      onOpen={onOpen}
      readOnly={false}
      wrapperClassName="w-full"
      popupClassName="absolute -top-1 z-50 w-full"
      popup={

        <LocationSelector
          onLocationSelect={handleLocationSelect}
          placeholder={placeholder}
          onClose={onClose}
        />

      }
    />
  );
}
