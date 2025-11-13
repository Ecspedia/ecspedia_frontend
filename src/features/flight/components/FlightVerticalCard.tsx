import { Flight } from '@/types/api';
import { FlightCardContext } from '../utils';
import { useFlightCardContext } from '../hooks';
import Image from 'next/image';
import { Plane } from 'lucide-react';

interface FlightVerticalCardProps {
    flight: Flight;
}

export default function FlightVerticalCard({ flight }: FlightVerticalCardProps) {
    return (
        <FlightCardContext.Provider value={{ flight }}>
            <div className="border-border flex flex-col gap-2 rounded-lg border p-4 max-w-sm hover:shadow-lg transition-shadow">
                <FlightVerticalCard.Image />
                <FlightVerticalCard.Content>
                    <FlightVerticalCard.Route />
                    <FlightVerticalCard.Company />
                    <FlightVerticalCard.Details />
                </FlightVerticalCard.Content>
                <div className="flex items-center justify-between mt-2">
                    <FlightVerticalCard.Pricing />
                </div>
            </div>
        </FlightCardContext.Provider>
    );
}

FlightVerticalCard.Image = function FlightVerticalCardImage() {
    const { flight } = useFlightCardContext();

    return (
        <div className="relative aspect-[4/3] w-64 shrink-0 overflow-hidden rounded-lg">
            {flight.image ? (
                <Image
                    src={flight.image}
                    alt={`${flight.arrivalLocation}`}
                    fill
                    className="object-cover"
                    sizes="256px"
                />
            ) : (
                <div className="bg-surface-raised flex h-full w-full items-center justify-center">
                    <Plane className="h-16 w-16 text-muted" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
                <div className="text-2xl font-bold">{flight.arrivalLocation}</div>
            </div>
        </div>
    );
};

FlightVerticalCard.Content = function FlightVerticalCardContent({
    children
}: {
    children: React.ReactNode
}) {
    return <div className="flex flex-col gap-3">{children}</div>;
};

FlightVerticalCard.Route = function FlightVerticalCardRoute() {
    const { flight } = useFlightCardContext();

    return (
        <div className="flex items-center gap-3">
            <div className="text-primary font-semibold">{flight.departureLocation}</div>
            <svg
                className="h-4 w-4 text-muted flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            </svg>
            <div className="text-primary font-semibold">{flight.arrivalLocation}</div>
        </div>
    );
};

FlightVerticalCard.Company = function FlightVerticalCardCompany() {
    const { flight } = useFlightCardContext();

    return (
        <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded">
                <Image
                    src="/images/home/latam_airlines_icon.png"
                    alt={flight.company}
                    width={24}
                    height={24}
                    className="object-contain"
                />
            </div>
            <div className="text-secondary text-sm">{flight.company}</div>
        </div>
    );
};

FlightVerticalCard.Details = function FlightVerticalCardDetails() {
    const { flight } = useFlightCardContext();

    return (
        <div className="flex items-center gap-4 text-sm text-tertiary">
            <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{flight.totalTime}</span>
            </div>
            <div className="flex items-center gap-1">
                <span>🕐</span>
                <span>{flight.departureTime}</span>
            </div>
        </div>
    );
};

FlightVerticalCard.Pricing = function FlightVerticalCardPricing() {
    const { flight } = useFlightCardContext();

    return (
        <div className="flex flex-col">
            <div className="text-tertiary text-xs">From</div>
            <div className="text-primary text-2xl font-bold">${flight.price}</div>
        </div>
    );
};

