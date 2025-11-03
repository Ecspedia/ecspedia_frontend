/**
 * Confirmation Actions Component
 *
 * Single Responsibility: Handle print and navigation actions
 */

'use client';

import { Button } from '@/components/ui';

interface ConfirmationActionsProps {
  onPrint: () => void;
  onClose: () => void;
}

export default function ConfirmationActions({ onPrint, onClose }: ConfirmationActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        text="Print Confirmation"
        onClick={onPrint}
        className="w-full p-2"
      />
      <Button
        type="button"
        text="Back to Home"
        variant='blank'
        onClick={onClose}
        className="w-full p-2 bg-background text-secondary"
      />
    </div>
  );
}
