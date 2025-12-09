import type { HotelResponseDto } from '@/types/graphql';
import dynamic from "next/dynamic";

const DynamicGoogleHotelMap = dynamic(
    () => import('@/features/hotel/components/GoogleHotelMap'),
    {
        ssr: false,
        loading: () => <div className="h-full w-full animate-pulse rounded-xl bg-muted" />,
    }
);

const GoogleMapContent = ({ hotels, isHidden, location }: { hotels: HotelResponseDto[], isHidden: boolean, location: string }) => {
    return hotels.length > 0 && !isHidden ? (
        <div className="h-full w-full">
            <DynamicGoogleHotelMap key={location} hotels={hotels} />
        </div>
    ) : null;
};

export default GoogleMapContent;