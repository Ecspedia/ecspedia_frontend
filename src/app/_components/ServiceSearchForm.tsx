
import { useAppSelector } from '@/hooks/hooks';
import { ServiceType } from '@/types/services';
import { SearchHotelForm } from '@/features/hotel';
import { SearchFlightForm } from '@/features/flight';
import { selectService } from '@/features/service-selector/store/serviceSelectorSlice';

export default function ServiceSearchForm() {
  const currentServiceTabSelected = useAppSelector(selectService);
  if (currentServiceTabSelected === ServiceType.FLIGHTS) return <SearchFlightForm />;
  if (currentServiceTabSelected === ServiceType.STAYS) return <SearchHotelForm />;
  return <div className="h-30 w-full"></div>;
}
