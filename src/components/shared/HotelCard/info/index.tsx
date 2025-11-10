import { useHotelCardContext } from '@/features/hotel/hooks';
import { MapPin, X } from 'lucide-react';
import { cn } from '@/utils/utils';


// HotelCardTitle - Displays hotel name and chain
export function HotelCardTitle() {
  const { hotel } = useHotelCardContext();

  return (
    <div className="flex items-center gap-2">
      <h3 className="text-primary cursor-pointer text-lg font-semibold hover:underline">
        {hotel.name}
      </h3>

    </div>
  );
}

// HotelCardLocation - Displays hotel location with icon
export function HotelCardLocation() {
  const { hotel } = useHotelCardContext();

  // Build location string with available information
  const locationParts = [
    hotel.address,
    hotel.city,
    hotel.country,
  ].filter(Boolean);
  const locationString = locationParts.length > 0
    ? locationParts.join(', ')
    : hotel.location;

  return (
    <div className="flex items-center gap-1 mt-1">
      <MapPin className="text-secondary h-3 w-3" />
      <p className="text-secondary text-sm">{locationString}</p>
    </div>
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
      className="text-secondary hover:text-primary shrink-0 rounded-full p-1 transition-colors"
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