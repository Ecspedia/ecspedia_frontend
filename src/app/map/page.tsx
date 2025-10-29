'use client';
import { useAppSelector } from '@/hooks/hooks';
import { selectHotelResults } from '@/components/features/hotel/search-form/store/hotelSearchSlice';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { GoogleMapHotel } from '@/components/features/hotel/map';
import { cn } from '@/lib/utils';
import { selectIsDarkMode } from '@/components/features/dark-mode';

export default function FullScreenMapPage() {
  const hotels = useAppSelector(selectHotelResults);
  const router = useRouter();

  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="relative h-screen w-screen">
      <button
        onClick={handleClose}
        className={cn(
          'text-primary hover:bg-muted absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg px-4 py-3 font-semibold shadow-lg transition-all hover:shadow-xl',
          isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
        )}
        title="Close full screen"
      >
        <X className="h-5 w-5" />
        <span>Close</span>
      </button>
      <GoogleMapHotel hotels={hotels} isFullScreen={true} />
    </div>
  );
}
