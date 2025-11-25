'use client';
import { useState } from 'react';
import { useFullscreenPopup } from '@/components/shared/ExpandableTextField/FullscreenPopupContext';

interface UseGuestSelectorProps {
  initialAdults?: number;
  onApply: (adults: number) => void;
  onClose: () => void;
  isMobile?: boolean;
}

export default function useGuestSelector({
  initialAdults = 1,
  onApply,
  onClose,
  isMobile,
}: UseGuestSelectorProps) {
  const [adults, setAdults] = useState(initialAdults);
  const { setPopup } = useFullscreenPopup();

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
    if (isMobile) {
      setPopup(null);
    }
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
