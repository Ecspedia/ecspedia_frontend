import { Hotel } from '@/types/api';
import { HotelCardContext } from '../../utils';
import HotelCard from '.';

interface HotelVerticalCardProps {
    hotel: Hotel;
}

export default function HotelVerticalCard({ hotel }: HotelVerticalCardProps) {
    return (
        <HotelCardContext.Provider value={{ hotel }}>
            <div className="border-border flex flex-col gap-2 rounded-lg border p-4 max-w-sm">
                <HotelCard.Image />
                <HotelCard.Content>
                    <HotelCard.Rating>
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </HotelCard.Rating>
                    <HotelCard.Info.Title />
                    <HotelCard.Info.Location />
                </HotelCard.Content>
                <div className="flex items-center justify-between">
                    <HotelCard.Pricing />
                </div>
            </div>
        </HotelCardContext.Provider>
    );
}
