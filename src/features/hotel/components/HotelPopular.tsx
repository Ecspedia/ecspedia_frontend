'use client';

import { Spinner } from "@/components/ui/Spinner";
import { Hotel } from "@/types";
import { ScrollableList } from "@/components/shared";
import HotelVerticalCard from '@/features/hotel/components/HotelVerticalCard';

interface HotelPopularProps {
    hotels: Hotel[];
    loading: boolean;
    error: string;
}

export default function HotelPopular(hotelPopularProps: HotelPopularProps) {
    const { hotels, loading, error } = hotelPopularProps;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (hotels.length === 0) {
        return null;
    }

    return (
        <section className="mt-3 bg-surface-raised rounded-lg ">
            <div className="mb-3">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-xl font-semibold text-primary">
                        Popular Hotels
                    </h2>
                    <p className="text-tertiary text-xs">
                        Discover our most loved hotels
                    </p>
                </div>
            </div>

            <div className="">
                <ScrollableList
                    items={hotels}
                    direction="horizontal"
                    initialBatchSize={6}
                    renderItem={(item) => <HotelVerticalCard key={item.id} hotel={item} />}
                />
            </div>
        </section >
    );
}


const Loading = () => (
    <section className="py-12">
        <div className="flex items-center justify-center gap-4">
            <Spinner size="lg" />
            <p className="text-secondary">Loading popular hotels...</p>
        </div>
    </section>
);

const Error = ({ error }: { error: string }) => (
    <section className="py-12">
        <div className="bg-destructive/10 text-destructive rounded-lg p-6 text-center">
            <p className="font-medium">Failed to load popular hotels</p>
            <p className="text-sm mt-2">{error}</p>
        </div>
    </section>
);