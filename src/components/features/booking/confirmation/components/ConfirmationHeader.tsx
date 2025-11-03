/**
 * Confirmation Header Component
 *
 * Single Responsibility: Display success icon and title
 */

'use client';

import { CheckCircle } from 'lucide-react';

export default function ConfirmationHeader() {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <CheckCircle className="w-16 h-16 text-success mb-4" />
      <h2 className="text-2xl font-bold text-center">Booking Confirmed!</h2>
      <p className="text-muted-foreground text-center mt-2">
        Your reservation has been successfully processed
      </p>
    </div>
  );
}
