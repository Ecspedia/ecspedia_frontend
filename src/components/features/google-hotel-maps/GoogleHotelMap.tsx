import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState, useMemo, useCallback } from 'react';
import { Hotel } from '@/types/hotel';
import HotelDetailCard from './HotelDetailCard';
import { useRouter } from 'next/navigation';
import { Maximize2 } from 'lucide-react';

interface HotelMapProps {
  hotels?: Hotel[];
  isFullScreen?: boolean;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function HotelMap({ hotels = [], isFullScreen = false }: HotelMapProps) {
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const router = useRouter();

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
      {/* Show expand button only when NOT in fullscreen mode */}
      {!isFullScreen && (
        <button
          onClick={handleExpandMap}
          className="flex- absolute top-4 right-4 z-50 rounded-lg bg-white p-2 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
          title="Expand map to full screen"
        >
          <div className="flex items-center justify-center gap-1">
            <Maximize2 className="h-5 w-5 text-gray-700" />
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
                    ? 'bg-secondary text-white'
                    : 'text-secondary bg-white'
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
