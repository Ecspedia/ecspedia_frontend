import HotelCard from '@/components/shared/HotelCard';
import type { Hotel } from '@/types/graphql';

interface HotelVerticalCardProps {
    hotel: Hotel;
}

export default function HotelVerticalCard({ hotel }: HotelVerticalCardProps) {
    return (
        <HotelCard.Root hotel={hotel}>
            <div className="border-border flex flex-col gap-2 rounded-lg border p-4 max-w-sm min-h-100">
                <HotelCard.Image />
                <HotelCard.Content>
                    <HotelCard.Rating>
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </HotelCard.Rating>
                    <div className="flex-1 min-h-0">
                        <HotelCard.Info.Title />
                        <HotelCard.Info.Location />
                    </div>
                </HotelCard.Content>
                <div className="flex items-center justify-between">
                    <HotelCard.Pricing />
                </div>
            </div>
        </HotelCard.Root>
    );
}