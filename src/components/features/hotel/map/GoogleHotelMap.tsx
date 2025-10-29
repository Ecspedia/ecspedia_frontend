import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState, useMemo, useCallback } from 'react';
import { Hotel } from '@/types/hotel';
import HotelDetailCard from './HotelDetailCard';
import { useRouter } from 'next/navigation';
import { Maximize2 } from 'lucide-react';
import { useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '../../dark-mode/store/darkModeSlice';
import { cn } from '@/lib/utils';

interface HotelMapProps {
  hotels?: Hotel[];
  isFullScreen?: boolean;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function HotelMap({ hotels = [], isFullScreen = false }: HotelMapProps) {
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const router = useRouter();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  // Filter hotels that have valid coordinates
  const hotelsWithCoordinates = useMemo(
    () => hotels.filter((hotel) => hotel.latitude !== undefined && hotel.longitude !== undefined),
    [hotels]
  );

  // Set center to first hotel or default location (Medellín, Colombia)
  const center = useMemo(
    () =>
      hotelsWithCoordinates.length > 0
        ? { lat: hotelsWithCoordinates[0].latitude!, lng: hotelsWithCoordinates[0].longitude! }
        : { lat: 6.2442, lng: -75.5812 },
    [hotelsWithCoordinates]
  );

  const handleMarkerClick = useCallback((hotelId: string) => {
    setSelectedHotelId(hotelId);
  }, []);

  const handleCloseDetailCard = useCallback(() => {
    setSelectedHotelId(null);
  }, []);

  const handleExpandMap = useCallback(() => {
    router.push('/map');
  }, [router]);

  // Find the selected hotel
  const selectedHotel = useMemo(
    () => hotelsWithCoordinates.find((hotel) => hotel.id === selectedHotelId),
    [hotelsWithCoordinates, selectedHotelId]
  );

  return (
    <div className={`relative ${!isFullScreen ? 'overflow-hidden rounded-xl' : ''}`}>
      {/* Special bg color only for adjust google map theme */}
      {!isFullScreen && (
        <button
          onClick={handleExpandMap}
          className={cn(
            'text-primary absolute top-4 right-4 z-10 rounded-lg p-2 shadow-md transition-all hover:shadow-lg',
            isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
          )}
          title="Expand map to full screen"
        >
          <div className="b flex items-center justify-center gap-1">
            <Maximize2 className="text-primary h-5 w-5" />
            Expand map to full screen
          </div>
        </button>
      )}
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: '100%', height: isFullScreen ? '100vh' : '300px' }}
          defaultCenter={center}
          defaultZoom={13}
          mapId="hotel-map"
          disableDefaultUI={false}
          zoomControl={true}
          streetViewControl={false}
          mapTypeControl={false}
          clickableIcons={false}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        >
          {hotelsWithCoordinates.map((hotel) => (
            <AdvancedMarker
              key={hotel.id}
              position={{ lat: hotel.latitude!, lng: hotel.longitude! }}
              onClick={() => handleMarkerClick(hotel.id)}
            >
              <div
                className={`cursor-pointer rounded px-3 py-1 text-sm font-medium shadow-md ${
                  selectedHotelId === hotel.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-secondary text-white'
                }`}
              >
                ${hotel.pricePerNight}
              </div>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>

      {/* Show HotelDetailCard only in fullscreen mode */}
      {isFullScreen && selectedHotel && (
        <HotelDetailCard hotel={selectedHotel} onClose={handleCloseDetailCard} />
      )}
    </div>
  );
}
