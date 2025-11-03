/**
 * Next Steps Component
 *
 * Single Responsibility: Display what happens next after booking
 */

'use client';

interface NextStepsProps {
  guestEmail: string;
}

export default function NextSteps({ guestEmail }: NextStepsProps) {
  return (
    <div className="bg-info/10 border border-info rounded-lg p-4 text-sm">
      <p className="font-semibold mb-1">What&apos;s Next?</p>
      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
        <li>A confirmation email has been sent to {guestEmail}</li>
        <li>Please bring a valid ID and this confirmation code to check-in</li>
        <li>Contact the hotel directly for any special arrangements</li>
      </ul>
    </div>
  );
}
