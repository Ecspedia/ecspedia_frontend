import type { Hotel } from '@/types/graphql';

import HotelCard from '@/components/shared/HotelCard';
import HotelCardImage from '@/components/shared/HotelCard/image';
import HotelCardInfo from '@/components/shared/HotelCard/info';
import { HotelCardRating, HotelCardRatingNumber, HotelCardGroup, HotelCardRatingLabel } from '@/components/shared/HotelCard/rating';

interface BookingHotelCardProps {
    hotel: Hotel;
}

function BookingHotelCard({ hotel }: BookingHotelCardProps) {
    return (
        <HotelCard.Root hotel={hotel}>
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
        </HotelCard.Root>
    );
}

export default BookingHotelCard;

