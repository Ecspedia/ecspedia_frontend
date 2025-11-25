import { cn } from '@/utils/utils';
import { MapPin, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useHotelCardContext } from '../hooks/useHotelCardContext';
export function HotelCardTitle({ className }: { className?: string }) {
  const { hotel } = useHotelCardContext();
  return (
    <h3 className={cn("text-primary cursor-pointer text-lg font-semibold hover:underline line-clamp-2", className)}>
      {hotel.name}
    </h3>
  );
}

export function HotelCardLocation({ className }: { className?: string }) {
  const { hotel } = useHotelCardContext();
  const router = useRouter();

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

interface HotelCardDescriptionProps {
  className?: string;
}

export function HotelCardDescription({ className }: HotelCardDescriptionProps) {
  const { hotel } = useHotelCardContext();
  if (!hotel.hotelDescription) return null;
  return (
    <div
      className={cn(
        'text-secondary mt-1 text-xs',
        '[&>p]:mb-1 [&>p:last-child]:mb-0',
        '[&>p>strong]:font-semibold [&>p>strong]:text-primary',
        className ?? 'line-clamp-2'
      )}
      dangerouslySetInnerHTML={{ __html: hotel.hotelDescription }}
    />
  );
}




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


// function HotelCardInfo({ withClose, onClose }: HotelCardInfoProps = {}) {
//   return (
//     <div className="flex items-start justify-between gap-2">
//       <div className="flex flex-col">
//         <HotelCardInfo.Title />
//         <HotelCardInfo.Location />
//         <HotelCardInfo.Description />

//       </div>
//       {withClose && onClose && <HotelCardInfo.CloseButton onClose={onClose} />}
//     </div>
//   );
// }
