import { ScrollableList } from '@/components/shared';
import HotelCard from '@/components/shared/HotelCard';
import { Spinner } from '@/components/ui';
import type { Hotel } from '@/types/graphql';
import { Calendar, Construction, HotelIcon, MapPin, Star } from 'lucide-react';
import { memo } from 'react';

interface HotelSearchResultProps {
  hotels: Hotel[];
  loading?: boolean;
  error?: string | null;
  hasSearched?: boolean;
}

function HotelSearchResult(hotelSearchResultProps: HotelSearchResultProps) {
  const { hotels, loading = false, error, hasSearched = false } = hotelSearchResultProps;
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
  return (
    <ScrollableList
      items={hotels}
      direction='vertical'
      renderItem={(hotel) => <HotelCard key={hotel.id} hotel={hotel} />}
    />
  );
}

HotelSearchResult.NotFound = function HotelNotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <p className="text-secondary">No hotels found. Try searching for a location.</p>
    </div>
  );
};

HotelSearchResult.loading = function HotelLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Spinner size="lg" />
      <p className="text-secondary">Loading hotels...</p>
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