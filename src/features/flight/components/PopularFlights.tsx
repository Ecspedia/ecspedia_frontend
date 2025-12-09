'use client';

import { ScrollableList } from "@/components/shared";
import { Spinner } from "@/components/ui/Spinner";
import { Flight } from '@/types/global';
import FlightVerticalCard from './FlightVerticalCard';

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
        <section className="relative overflow-hidden lg:pr-0">
            <div className="relative">
                <div className="mb-3">
                    <div className="flex items-baseline mt-2 lg:mt-0 gap-1 lg:gap-3 flex-col lg:flex-row">
                        <h2 className="text-xl font-semibold text-primary">Popular Flights</h2>
                        <p className="text-base font-normal text-primary">Explore trending destinations</p>
                    </div>
                </div>
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

