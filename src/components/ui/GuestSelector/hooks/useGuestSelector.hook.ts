import { useState } from 'react';

interface UseGuestSelectorProps {
  initialAdults?: number;
  onApply: (adults: number) => void;
  onClose: () => void;
}

export default function useGuestSelector({
  initialAdults = 1,
  onApply,
  onClose,
}: UseGuestSelectorProps) {
  const [adults, setAdults] = useState(initialAdults);

  const handleIncrement = () => {
    const newAdults = adults + 1;
    setAdults(newAdults);
    onApply(newAdults);
  };

  const handleDecrement = () => {
    const newAdults = adults - 1;
    setAdults(newAdults);
    onApply(newAdults);
  };

  const handleApply = () => {
    onApply(adults);
    onClose();
  };

  const isValid = adults > 0;

  return {
    adults,
    handleIncrement,
    handleDecrement,
    handleApply,
    isValid,
    min: 1,
    max: 10,
  };
}
