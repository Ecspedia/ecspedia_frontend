'use client';
import { useAppSelector } from '@/lib/hooks';
import { selectHotelResults } from '@/lib/features/hotel/hotelSearchSlice';
import { GoogleMapHotel } from '@/components/features/google-hotel-maps';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function FullScreenMapPage() {
  const hotels = useAppSelector(selectHotelResults);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="relative h-screen w-screen">
      <button
        onClick={handleClose}
        className="text-primary absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg bg-white px-4 py-3 font-semibold shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
        title="Close full screen"
      >
        <X className="h-5 w-5" />
        <span>Close</span>
      </button>
      <GoogleMapHotel hotels={hotels} isFullScreen={true} />
    </div>
  );
}
