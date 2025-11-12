import { Hotel } from '@/types/api';
import { HotelCardContext } from '@/features/hotel/utils';
import HotelCardImage from '@/components/shared/HotelCard/image';
import HotelCardInfo from '@/components/shared/HotelCard/info';
import { HotelCardRating, HotelCardRatingNumber, HotelCardGroup, HotelCardRatingLabel } from '@/components/shared/HotelCard/rating';

interface BookingHotelCardProps {
    hotel: Hotel;
}

function BookingHotelCard({ hotel }: BookingHotelCardProps) {
    return (
        <HotelCardContext.Provider value={{ hotel }}>
            <div className="flex gap-4">
                <div className="shrink-0">
                    <HotelCardImage variant="compact" />
                </div>
                <div className="flex-1 min-w-0">
                    <HotelCardInfo />
                    <HotelCardRating>
                        <HotelCardRatingNumber />
                        <HotelCardGroup>
                            <HotelCardRatingLabel />
                        </HotelCardGroup>
                    </HotelCardRating>
                </div>
            </div>
        </HotelCardContext.Provider>
    );
}

export default BookingHotelCard;

