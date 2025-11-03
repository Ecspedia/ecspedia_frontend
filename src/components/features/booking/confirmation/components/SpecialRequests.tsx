/**
 * Special Requests Component
 *
 * Single Responsibility: Display special requests if provided
 */

'use client';

interface SpecialRequestsProps {
  specialRequests?: string;
}

export default function SpecialRequests({ specialRequests }: SpecialRequestsProps) {
  if (!specialRequests) return null;

  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-4">Special Requests</h3>
      <p className="font-medium">{specialRequests}</p>
    </div>
  );
}
