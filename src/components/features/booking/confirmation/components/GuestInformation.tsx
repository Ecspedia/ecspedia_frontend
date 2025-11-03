/**
 * Guest Information Component
 *
 * Single Responsibility: Display guest contact details
 */

'use client';

import { GuestDetails } from '@/types/booking';

interface GuestInformationProps {
  guestDetails: GuestDetails;
}

export default function GuestInformation({ guestDetails }: GuestInformationProps) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-4">Guest Information</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Guest Name</p>
          <p className="font-medium">
            {guestDetails.firstName} {guestDetails.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{guestDetails.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="font-medium">{guestDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
