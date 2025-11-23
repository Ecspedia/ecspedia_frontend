import { ScrollableList } from '@/components/shared';
import HotelCard from '@/components/shared/HotelCard';
import { Skeleton } from '@/components/ui/Skeleton/skeleton';
import { useIsMobile } from '@/hooks';
import type { Hotel } from '@/types/graphql';
import { Calendar, Construction, HotelIcon, MapPin, Star } from 'lucide-react';
import { memo } from 'react';
import HotelCardVerticalMobile from './HotelCardVerticalMobile';

interface HotelSearchResultProps {
  hotels: Hotel[];
  loading?: boolean;
  error?: string | null;
  hasSearched?: boolean;
}

function HotelSearchResult(hotelSearchResultProps: HotelSearchResultProps) {
  const { hotels, loading = false, error, hasSearched = false } = hotelSearchResultProps;
  const isMobile = useIsMobile();
  if (error && error.length > 0) {
    return <HotelSearchResult.error></HotelSearchResult.error>;
  }
  if (loading) {
    return <HotelSearchResult.loading />;
  }
  if (hotels.length === 0 && hasSearched) {
    return <HotelSearchResult.NotFound />;
  }
  if (hotels.length === 0) {
    return <HotelSearchResult.Welcome />;
  }
  return <ScrollableList items={hotels} direction='vertical'
    renderItem={(hotel) => {
      return (isMobile ? <HotelCardVerticalMobile key={hotel.id} hotel={hotel} /> : <HotelCard key={hotel.id} hotel={hotel} />)
    }}
    initialBatchSize={6}
    batchSize={6}
  />;
}

HotelSearchResult.NotFound = function HotelNotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <p className="text-secondary">No hotels found. Try searching for a location.</p>
    </div>
  );
};

HotelSearchResult.loading = function HotelLoading() {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        isMobile ? <HotelSearchResult.loadingItemMobile key={index} /> : <HotelSearchResult.loadingItem key={index} />
      ))}
    </div>
  );
};

HotelSearchResult.loadingItem = function HotelLoadingItem() {
  return (
    <div className="flex w-full gap-4 rounded-lg border border-border bg-background p-4">
      <Skeleton className="h-48 w-64 flex-shrink-0 rounded-lg" />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-1 mt-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
};

HotelSearchResult.loadingItemMobile = function HotelLoadingItemMobile() {
  return (
    <div className="flex flex-col w-full rounded-lg border border-border bg-background overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
};

HotelSearchResult.error = function HotelErrorContainer() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-12">
      <div className="max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-accent rounded-full p-3 shadow-lg">
            <Construction className="h-14 w-14 text-white" strokeWidth={2} />
          </div>
        </div>

        <h2 className="text-primary mb-4 text-3xl font-bold">
          We&apos;re Working on Making Your Travel Better
        </h2>

        <p className="text-secondary mb-6 text-lg leading-relaxed">
          We&apos;re currently experiencing some technical difficulties while searching for hotels.
          Our team is working hard to get everything back on track for you.
        </p>
      </div>
    </div>
  );
};
HotelSearchResult.Welcome = function WelcomeContainer() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-12">
      <div className="max-w-2xl text-center">
        <div className="mb-8 flex justify-center gap-4">
          <div className="bg-accent rounded-full p-3 shadow-lg">
            <HotelIcon className="h-10 w-10 text-white" strokeWidth={2} />
          </div>
          <div className="bg-accent rounded-full p-3 shadow-lg">
            <MapPin className="h-10 w-10 text-white" strokeWidth={2} />
          </div>
          <div className="bg-accent rounded-full p-3 shadow-lg">
            <Calendar className="h-10 w-10 text-white" strokeWidth={2} />
          </div>
          <div className="bg-accent rounded-full p-3 shadow-lg">
            <Star className="h-10 w-10 text-white" strokeWidth={2} />
          </div>
        </div>

        <h2 className="text-primary mb-4 text-4xl font-bold">Your Perfect Stay Awaits</h2>

        <p className="text-secondary mb-6 text-lg leading-relaxed">
          Discover amazing hotels around the world. Whether you&apos;re planning a business trip, a
          family vacation, or a romantic getaway, we&apos;ll help you find the perfect place to
          stay.
        </p>

        <div className="mt-8">
          <p className="text-secondary text-base font-medium">
            Start by searching for your destination above
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(HotelSearchResult);