import { cn } from '@/utils/utils';
import { MapPin, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useHotelCardContext } from '../hooks/useHotelCardContext';


// HotelCardTitle - Displays hotel name and chain
export function HotelCardTitle() {
  const { hotel } = useHotelCardContext();

  return (
    <div className="flex items-center gap-2">
      <h3 className="text-primary cursor-pointer text-lg font-semibold hover:underline line-clamp-2">
        {hotel.name}
      </h3>

    </div>
  );
}

// HotelCardLocation - Displays hotel location with icon
export function HotelCardLocation({ className }: { className?: string }) {
  const { hotel } = useHotelCardContext();
  const router = useRouter();

  // Build location string with available information
  const locationParts = [
    hotel.address,
    hotel.city,
    hotel.country,
  ].filter(Boolean);
  const locationString = locationParts.length > 0
    ? locationParts.join(', ')
    : hotel.location;

  const handleOpenMap = () => {
    const lat = hotel.latitude;
    const lng = hotel.longitude;

    if (lat && lng) {
      router.push(`/map?lat=${lat}&lng=${lng}&hotelId=${hotel.id}`);
    } else if (hotel.city) {
      router.push(`/map?location=${encodeURIComponent(hotel.city)}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpenMap}
      className={cn("mt-1 flex cursor-pointer items-center gap-1 transition-colors hover:text-primary", className)}
    >
      <MapPin className="h-3 w-3 text-secondary" />
      <p className="text-sm text-secondary hover:underline whitespace-nowrap text-ellipsis overflow-hidden">{locationString}</p>
    </button>
  );
}

// HotelCardDescription - Displays hotel description with HTML support
interface HotelCardDescriptionProps {
  expanded?: boolean;
}

export function HotelCardDescription({ expanded = false }: HotelCardDescriptionProps) {
  const { hotel } = useHotelCardContext();

  if (!hotel.hotelDescription) return null;

  return (
    <div
      className={cn(
        'text-secondary mt-1 text-xs',
        '[&>p]:mb-1 [&>p:last-child]:mb-0',
        '[&>p>strong]:font-semibold [&>p>strong]:text-primary',
        !expanded && 'line-clamp-2'
      )}
      dangerouslySetInnerHTML={{ __html: hotel.hotelDescription }}
    />
  );
}

// HotelCardAccessibility - Displays accessibility indicator
export function HotelCardAccessibility() {
  const { hotel } = useHotelCardContext();

  if (!hotel.accessibilityAttributes) return null;

  return (
    <></>
  );
}

// HotelCardCloseButton - Close button for detail view
interface HotelCardCloseButtonProps {
  onClose: () => void;
}

export function HotelCardCloseButton({ onClose }: HotelCardCloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className="text-secondary hover:text-primary rounded-full p-1 transition-colors shrink-0"
    >
      <X className="h-7 w-7" />
    </button>
  );
}

// Main HotelCardInfo component - Composes all info parts
interface HotelCardInfoProps {
  withClose?: boolean;
  onClose?: () => void;
}

function HotelCardInfo({ withClose, onClose }: HotelCardInfoProps = {}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col">
        <HotelCardInfo.Title />
        <HotelCardInfo.Location />
        <HotelCardInfo.Description />

      </div>
      {withClose && onClose && <HotelCardInfo.CloseButton onClose={onClose} />}
    </div>
  );
}

// Attach sub-components for dot notation access
HotelCardInfo.Title = HotelCardTitle;
HotelCardInfo.Location = HotelCardLocation;
HotelCardInfo.Description = HotelCardDescription;
HotelCardInfo.Accessibility = HotelCardAccessibility;
HotelCardInfo.CloseButton = HotelCardCloseButton;

export default HotelCardInfo;