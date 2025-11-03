/**
 * Form Actions Component
 *
 * Reusable navigation buttons for multi-step forms
 */

'use client';

import { Button } from '@/components/ui';

interface FormActionsProps {
  onBack?: () => void;
  submitText: string;
  isSubmitting?: boolean;
  backText?: string;
  showBack?: boolean;
}

export default function FormActions({
  onBack,
  submitText,
  isSubmitting = false,
  backText = 'Back',
  showBack = false,
}: FormActionsProps) {
  return (
    <div className={`flex ${showBack ? 'justify-between' : 'justify-end'}`}>
      {showBack && onBack && (
        <Button
          type="button"
          variant='blank'
          text={backText}
          onClick={onBack}
          disabled={isSubmitting}
          className="p-4 bg-background text-secondary hover:text-primary"
        />
      )}
      <Button
        type="submit"
        text={submitText}
        disabled={isSubmitting}
        className="p-4"
      />
    </div>
  );
}
