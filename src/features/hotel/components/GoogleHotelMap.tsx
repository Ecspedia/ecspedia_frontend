import HotelCard from '@/components/shared/HotelCard';
import { useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import type { HotelResponseDto } from '@/types/graphql';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface HotelMapProps {
  hotels?: HotelResponseDto[];
  isFullScreen?: boolean;
  initialCenter?: { lat: number; lng: number };
  initialSelectedHotel?: HotelResponseDto;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function HotelMap(hotelMapProps: HotelMapProps) {
  const { hotels, isFullScreen, initialCenter, initialSelectedHotel } = hotelMapProps;

  const [selectedHotel, setSelectedHotel] = useState<HotelResponseDto | null>(initialSelectedHotel || null);
  const [singleHotel] = useState<HotelResponseDto | null>(initialSelectedHotel || null);
  const router = useRouter();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  // Sync state when initialSelectedHotel prop changes
  useEffect(() => {
    setSelectedHotel(initialSelectedHotel || null);
  }, [initialSelectedHotel]);

  // Calculate selected hotel coordinates
  const selectedHotelCoords = useMemo(() => {
    if (!selectedHotel?.latitude || !selectedHotel?.longitude) return null;
    const lat = typeof selectedHotel.latitude === 'string'
      ? parseFloat(selectedHotel.latitude)
      : Number(selectedHotel.latitude);
    const lng = typeof selectedHotel.longitude === 'string'
      ? parseFloat(selectedHotel.longitude)
      : Number(selectedHotel.longitude);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  }, [selectedHotel]);

  // Calculate single hotel coordinates (persists even when card is closed)
  const singleHotelCoords = useMemo(() => {
    if (!singleHotel?.latitude || !singleHotel?.longitude) return null;
    const lat = typeof singleHotel.latitude === 'string'
      ? parseFloat(singleHotel.latitude)
      : Number(singleHotel.latitude);
    const lng = typeof singleHotel.longitude === 'string'
      ? parseFloat(singleHotel.longitude)
      : Number(singleHotel.longitude);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  }, [singleHotel]);

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
    // Use initialCenter if provided (from URL params)
    if (initialCenter) {
      return initialCenter;
    }
    if (hotelsWithCoordinates.length > 0) {
      // Calculate average center point for all hotels
      const avgLat = hotelsWithCoordinates.reduce((sum, hotel) => sum + Number(hotel.latitude), 0) / hotelsWithCoordinates.length;
      const avgLng = hotelsWithCoordinates.reduce((sum, hotel) => sum + Number(hotel.longitude), 0) / hotelsWithCoordinates.length;
      return { lat: avgLat, lng: avgLng };
    }
    return { lat: 6.2442, lng: -75.5812 };
  }, [hotelsWithCoordinates, initialCenter]);

  // Use higher zoom when viewing a specific hotel
  const defaultZoom = useMemo(() => {
    return initialCenter ? 17 : 13;
  }, [initialCenter]);

  const handleMarkerClick = useCallback((hotel: HotelResponseDto) => {
    setSelectedHotel(hotel);
  }, []);

  const handleCloseDetailCard = useCallback(() => {
    setSelectedHotel(null);
  }, []);

  const handleExpandMap = useCallback(() => {
    router.push('/map');
  }, [router]);

  return (
    <div className={`relative  h-full w-full ${!isFullScreen ? 'overflow-hidden rounded-xl' : ''}`}>
      {/* Special bg color only for adjust google map theme */}


      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: '100%', height: isFullScreen ? '100vh' : '100%' }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          mapId="hotel-map"
          zoomControl={isFullScreen}
          fullscreenControl={isFullScreen}


          disableDefaultUI={!isFullScreen}

          mapTypeControl={false}
          streetViewControl={false}


          gestureHandling={isFullScreen ? 'greedy' : 'none'}
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
                onClick={() => handleMarkerClick(hotel)}
              >
                <div
                  className={`cursor-pointer rounded px-3 py-1 text-sm font-medium shadow-md ${selectedHotel?.id === hotel.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-secondary text-white'
                    }`}
                >
                  ${price.toFixed(2)}
                </div>
              </AdvancedMarker>
            );
          })}
          {/* Show marker for single hotel (persists even when card is closed) */}
          {isFullScreen && singleHotel && singleHotelCoords && !hotelsWithCoordinates.some(h => h.id === singleHotel.id) && (
            <AdvancedMarker
              position={singleHotelCoords}
              onClick={() => setSelectedHotel(singleHotel)}
            >
              <div
                className={`cursor-pointer rounded px-3 py-1 text-sm font-medium shadow-md ${selectedHotel?.id === singleHotel.id
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-secondary text-white'
                  }`}
              >
                ${(singleHotel.pricePerNight || 0).toFixed(2)}
              </div>
            </AdvancedMarker>
          )}
          {/* Pan camera to selected hotel */}
          <MapController center={selectedHotelCoords} />
        </Map>
      </APIProvider>
      {!isFullScreen && (
        <ViewMapButton onClick={handleExpandMap} />
      )}

      {isFullScreen && selectedHotel && (
        <HotelCard hotel={selectedHotel} variant="detail-modal" onClose={handleCloseDetailCard} />
      )}
    </div>
  );
}

const ViewMapButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute border bottom-0 left-0 right-0 flex h-10 cursor-pointer items-center justify-center rounded-b-xl border-t border-border bg-background text-base lg:text-sm py-5 lg:py-1 font-medium text-brand-secondary transition hover:bg-hover"
    >
      View in map
    </button>
  );
};

interface MapControllerProps {
  center: { lat: number; lng: number } | null;
}

function MapController({ center }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (!map || !center) return;

    // Smooth pan with animation
    map.panTo(center);
  }, [map, center]);

  return null;
}