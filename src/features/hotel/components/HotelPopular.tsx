'use client';

import { ScrollableList } from '@/components/shared';
import { Skeleton } from '@/components/ui/Skeleton/skeleton';
import HotelVerticalCard from '@/features/hotel/components/HotelVerticalCard';
import { Hotel } from '@/types/graphql';

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
    <section className="relative overflow-hidden lg:pr-0">
      <div className="relative">
        <div className="mb-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-primary">Popular Hotels</h2>
            <p className="text-xs font-medium text-primary">Discover our most loved hotels</p>
          </div>
        </div>

        <ScrollableList
          items={hotels}
          direction="horizontal"
          initialBatchSize={6}
          renderItem={(item) => <HotelVerticalCard key={item.id} hotel={item} />}
        />
      </div>
    </section>
  );
}


const Loading = () => {
  return (
    <section>
      <div className="mb-3">
        <div className="flex items-baseline gap-3">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingItem key={index} />
        ))}
      </div>
    </section>
  );
};

const LoadingItem = () => (
    <div className="border-border flex flex-col gap-2 rounded-lg border p-4 max-w-sm min-h-100 min-w-[280px]">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded" />
            <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
        <div className="flex-1 min-h-0 flex flex-col gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    </div>
);

const Error = ({ error }: { error: string }) => (
    <section className="py-12">
        <div className="bg-destructive/10 text-destructive rounded-lg p-6 text-center">
            <p className="font-medium">Failed to load popular hotels</p>
            <p className="text-sm mt-2">{error}</p>
        </div>
    </section>
);