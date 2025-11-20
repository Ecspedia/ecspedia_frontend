import type { Hotel } from '@/types/graphql';
import HotelCard, { HotelCardInfo } from '@/components/shared/HotelCard';

interface BookingDetailsProps {
    hotel: Hotel;
}

export default function BookingDetails({ hotel }: BookingDetailsProps) {
    return (
        <HotelCard.Root hotel={hotel}>
            <div className="bg-surface rounded-lg border border-border p-6 mb-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Booking Summary</h2>
                <div className="relative">
                    <HotelCard.Image variant="expanded" />
                    <div className="absolute top-3 right-3 bg-surface text-primary backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </div>
                </div>
                <div className="flex gap-2 mt-2">
                    <HotelCard.Content className="justify-between">
                        <div>
                            <HotelCardInfo.Title />
                            <HotelCardInfo.Location />

                            <HotelCardInfo.Description expanded />

                        </div>

                    </HotelCard.Content>
                </div>
            </div >
        </HotelCard.Root>

    );
}

