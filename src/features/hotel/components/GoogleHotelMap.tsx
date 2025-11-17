import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState, useMemo, useCallback } from 'react';
import type { Hotel } from '@/types/graphql';
import HotelDetailCard from './HotelDetailCard';
import { useRouter } from 'next/navigation';
import { Maximize2 } from 'lucide-react';
import { useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { cn } from '@/utils/utils';
import { Button } from '@/components/ui';

interface HotelMapProps {
  hotels?: Hotel[];
  isFullScreen?: boolean;

}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function HotelMap(hotelMapProps: HotelMapProps) {
  const { hotels, isFullScreen } = hotelMapProps;

  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const router = useRouter();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const hotelsWithCoordinates = useMemo(
    () => {
      return (hotels || [])
        .map((hotel) => {
          // Handle coordinates that might be strings or numbers (after transformation)
          const lat = typeof hotel.latitude === 'string' ? parseFloat(hotel.latitude) : Number(hotel.latitude);
          const lng = typeof hotel.longitude === 'string' ? parseFloat(hotel.longitude) : Number(hotel.longitude);

          return {
            ...hotel,
            latitude: lat,
            longitude: lng,
          };
        })
        .filter(
          (hotel) =>
            hotel.latitude !== undefined &&
            hotel.latitude !== null &&
            !isNaN(hotel.latitude) &&
            hotel.longitude !== undefined &&
            hotel.longitude !== null &&
            !isNaN(hotel.longitude)
        );
    },
    [hotels]
  );


  // Calculate center as average of all hotel coordinates, or use first hotel, or default location
  const defaultCenter = useMemo(() => {
    if (hotelsWithCoordinates.length > 0) {
      // Calculate average center point for all hotels
      const avgLat = hotelsWithCoordinates.reduce((sum, hotel) => sum + Number(hotel.latitude), 0) / hotelsWithCoordinates.length;
      const avgLng = hotelsWithCoordinates.reduce((sum, hotel) => sum + Number(hotel.longitude), 0) / hotelsWithCoordinates.length;
      return { lat: avgLat, lng: avgLng };
    }
    return { lat: 6.2442, lng: -75.5812 };
  }, [hotelsWithCoordinates]);


  const handleMarkerClick = useCallback((hotelId: string) => {
    setSelectedHotelId(hotelId);
  }, []);

  const handleCloseDetailCard = useCallback(() => {
    setSelectedHotelId(null);
  }, []);

  const handleExpandMap = useCallback(() => {
    router.push('/map');
  }, [router]);

  // Find the selected hotel by id
  const selectedHotel = useMemo(
    () => hotelsWithCoordinates.find((hotel) => hotel.id === selectedHotelId),
    [hotelsWithCoordinates, selectedHotelId]
  );


  return (
    <div className={`relative h-full w-full ${!isFullScreen ? 'overflow-hidden rounded-xl' : ''}`}>
      {/* Special bg color only for adjust google map theme */}
      {!isFullScreen && (
        <Button
          onClick={handleExpandMap}
          variant="blank"
          className={cn(
            'absolute top-2 right-2 z-20 text-primary p-3 rounded-lg font-medium',
            isDarkMode ? 'bg-[rgb(68,68,68)]' : 'bg-background'
          )}
          title="Expand map to full screen"
        >
          <Button.Icon icon={Maximize2} />

        </Button>
      )}
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: '100%', height: isFullScreen ? '100vh' : '100%' }}
          defaultCenter={defaultCenter}
          defaultZoom={13}
          mapId="hotel-map"
          disableDefaultUI={true}
          zoomControl={true}
          streetViewControl={false}
          mapTypeControl={false}
          clickableIcons={false}
          colorScheme={isDarkMode ? 'DARK' : 'LIGHT'}
        >
          {isFullScreen && hotelsWithCoordinates.map((hotel) => {
            // Coordinates are already numbers
            const lat = Number(hotel.latitude);
            const lng = Number(hotel.longitude);
            // Use pricePerNight
            const price = hotel.pricePerNight || 0;

            return (
              <AdvancedMarker
                key={hotel.id}
                position={{ lat, lng }}
                onClick={() => handleMarkerClick(hotel.id)}
              >
                <div
                  className={`cursor-pointer rounded px-3 py-1 text-sm font-medium shadow-md ${selectedHotelId === hotel.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-secondary text-white'
                    }`}
                >
                  ${price.toFixed(2)}
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>

      {/* Show HotelDetailCard only in fullscreen mode */}
      {isFullScreen && selectedHotel && (
        <HotelDetailCard hotel={selectedHotel} onClose={handleCloseDetailCard} />
      )}
    </div>
  );
}
