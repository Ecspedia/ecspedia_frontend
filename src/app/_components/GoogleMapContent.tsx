import { Hotel } from "@/types/api";
import dynamic from "next/dynamic";

const DynamicGoogleHotelMap = dynamic(
    () => import('@/features/hotel/components/GoogleHotelMap'),
    {
        ssr: false,
        loading: () => <div className="h-[300px] w-full animate-pulse rounded-xl bg-muted" />,
    }
);

const GoogleMapContent = ({ hotels, isHidden, location }: { hotels: Hotel[], isHidden: boolean, location: string }) => {
    return hotels.length > 0 && !isHidden ? (
        <div className="mt-3">
            <DynamicGoogleHotelMap key={location} hotels={hotels} />
        </div>
    ) : null;
};

export default GoogleMapContent;