import { Flight } from '@/types/api';

import { ReactNode } from 'react';
import Image from 'next/image';
import { UI_DIMENSIONS } from './constants';
import { Button } from '@/components/ui';
import { useFlightCardContext } from './hooks';
import { FlightCardContext } from './utils';

interface FlightCardProps {
  flight: Flight;
}

// Main FlightCard Component
export default function FlightCard(flightCardProps: FlightCardProps) {
  const { flight } = flightCardProps;
  return (
    <FlightCardContext.Provider value={{ flight }}>
      <FlightCard.card>
        <FlightCard.leftSection>
          <FlightCard.times />
        </FlightCard.leftSection>
        <FlightCard.rightSection>
          <FlightCard.company />
          <FlightCard.pricing />
        </FlightCard.rightSection>
      </FlightCard.card>
    </FlightCardContext.Provider>
  );
}

// Compound components
FlightCard.company = function FligtCardCompany() {
  const { flight } = useFlightCardContext();
  return (
    <div className="relative mr-16 h-24 overflow-hidden rounded-lg">
      <div className="flex h-full items-center px-6 py-3">
        <div
          className="relative z-20 rounded-lg border-white"
          style={{ borderWidth: UI_DIMENSIONS.FLIGHT_CARD_COMPANY_LOGO_BORDER }}
        >
          <Image
            width={UI_DIMENSIONS.AIRLINE_ICON_SIZE}
            height={UI_DIMENSIONS.AIRLINE_ICON_SIZE}
            src="/images/home/latam_airlines_icon.png"
            alt="LATAM Airlines"
          />
        </div>
        <div className="text-primary ml-2 font-semibold">{flight.company}</div>
      </div>
      <div className="bg-primary absolute inset-0 opacity-5"></div>
    </div>
  );
};

FlightCard.times = function FlightCardTimes() {
  const { flight } = useFlightCardContext();
  return (
    <div className="flex">
      <div className="flex flex-col justify-center">
        <div className="text-primary text-3xl font-bold">{flight.departureTime}</div>
        <div className="text-tertiary">{flight.departureLocation}</div>
      </div>

      <div className="flex flex-col items-center justify-center px-8 pb-4">
        <div className="mb-1 text-xs text-muted-dark">{flight.totalTime}</div>
        <div className="flex items-center gap-2">
          <div className="h-px w-16 bg-muted-border"></div>
          <div className="text-xs font-semibold text-warning">1 Stop</div>
          <div className="h-px w-16 bg-muted-border"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-primary text-3xl font-bold">{flight.arrivalTime}</div>
        <div className="text-tertiary">{flight.arrivalLocation}</div>
      </div>
    </div>
  );
};

FlightCard.pricing = function FlightCardPricing() {
  const { flight } = useFlightCardContext();
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="text-tertiary text-xs">FROM</div>
      <div className="text-primary text-3xl font-bold">${flight.price}</div>
      <Button
        className="px-6 py-3 font-medium text-white"
        text="Select Flight"
        variant="secondary"
      />
    </div>
  );
};

FlightCard.leftSection = function FlightCardLeftSection({ children }: { children: ReactNode }) {
  return <div className="flex">{children}</div>;
};

FlightCard.rightSection = function FlightCardRightSection({ children }: { children: ReactNode }) {
  return <div className="flex">{children}</div>;
};

FlightCard.card = function FlightCardCard({ children }: { children: ReactNode }) {
  return <div className="border-border flex justify-between rounded-lg border p-4">{children}</div>;
};
