'use client';

import { Spinner } from "@/components/ui/Spinner";
import { ScrollableList } from "@/components/shared";
import FlightVerticalCard from './FlightVerticalCard';
import { Flight } from '@/types/api';

interface PopularFlightsProps {
    flights: Flight[];
    loading?: boolean;
    error?: string;
}

export default function PopularFlights({ flights, loading = false, error = '' }: PopularFlightsProps) {
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (flights.length === 0) {
        return null;
    }

    return (
        <section className="mt-3 bg-surface-raised rounded-lg">
            <div className="mb-3">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-xl font-semibold text-primary">
                        Popular Flights
                    </h2>
                    <p className="text-tertiary text-xs">
                        Explore trending destinations
                    </p>
                </div>
            </div>

            <div>
                <ScrollableList
                    items={flights}
                    direction="horizontal"
                    initialBatchSize={6}
                    renderItem={(flight) => <FlightVerticalCard key={flight.id} flight={flight} />}
                />
            </div>
        </section>
    );
}

const Loading = () => (
    <section className="py-12">
        <div className="flex items-center justify-center gap-4">
            <Spinner size="lg" />
            <p className="text-secondary">Loading popular flights...</p>
        </div>
    </section>
);

const Error = ({ error }: { error: string }) => (
    <section className="py-12">
        <div className="bg-destructive/10 text-destructive rounded-lg p-6 text-center">
            <p className="font-medium">Failed to load popular flights</p>
            <p className="text-sm mt-2">{error}</p>
        </div>
    </section>
);

