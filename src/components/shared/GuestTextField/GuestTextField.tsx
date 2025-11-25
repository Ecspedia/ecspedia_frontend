'use client';
import { ExpandableTextField } from '@/components/shared/ExpandableTextField';
import GuestSelector from '@/components/shared/GuestTextField/GuestSelector';
import { useIsMobile } from '@/hooks';
import { User } from 'lucide-react';

interface GuestTextFieldProps {
  isOpen: boolean;
  adults: number;
  placeholder?: string;
  onOpen: () => void;
  onAdultsSelect: (adults: number) => void;
  onClose: () => void;
}

export default function GuestTextField({
  isOpen,
  onOpen,
  adults,
  onAdultsSelect,
  onClose,
  placeholder = 'Adults',
}: GuestTextFieldProps) {
  const isMobile = useIsMobile();

  const formatAdultsInfo = () => {
    const adultText = adults === 1 ? 'adult' : 'adults';
    return `${adults} ${adultText}`;
  };

  return (
    <ExpandableTextField
      value={formatAdultsInfo()}
      placeholder={placeholder}
      icon={User}
      isOpen={isOpen}
      onOpen={onOpen}
      readOnly={false}
      popup={
        <GuestSelector
          initialAdults={adults}
          onApply={onAdultsSelect}
          onClose={onClose}
          isMobile={isMobile}
        />
      }
    />
  );
}
