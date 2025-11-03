/**
 * Confirmation Code Component
 *
 * Single Responsibility: Display the booking confirmation code
 */

'use client';

interface ConfirmationCodeProps {
  code: string;
}

export default function ConfirmationCode({ code }: ConfirmationCodeProps) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <p className="text-sm text-muted-foreground mb-1">Confirmation Code</p>
      <p className="text-2xl font-mono font-bold tracking-wider">{code}</p>
    </div>
  );
}
