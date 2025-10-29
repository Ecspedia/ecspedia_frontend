import TextField from '@/components/ui/TextField';
import GuestSelector from '@/components/ui/GuestSelector/GuestSelector';
import { User } from 'lucide-react';

interface GuestSelectionTextFieldProps {
  isOpen: boolean;
  onOpen: () => void;
  adults: number;
  onAdultsSelect: (adults: number) => void;
  onClose: () => void;
  placeholder?: string;
}

export default function GuestSelectionTextField({
  isOpen,
  onOpen,
  adults,
  onAdultsSelect,
  onClose,
  placeholder = 'Adults',
}: GuestSelectionTextFieldProps) {
  const formatAdultsInfo = () => {
    const adultText = adults === 1 ? 'adult' : 'adults';
    return `${adults} ${adultText}`;
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute top-0 left-0 z-50">
          <GuestSelector
            initialAdults={adults}
            onApply={onAdultsSelect}
            onClose={onClose}
          />
        </div>
      )}
      <TextField
        value={formatAdultsInfo()}
        placeholder={placeholder}
        onClick={onOpen}
        readOnly={false}
        icon={User}
      />
    </div>
  );
}
