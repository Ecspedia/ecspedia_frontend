'use client';

import { cn } from '@/lib/utils';
import { Bath, Bed, Coffee, Users, Wifi } from 'lucide-react';

export interface RoomType {
    id: string;
    name: string;
    description: string;
    capacity: number;
    bedType: string;
    price: number;
    amenities: string[];
}

export const ROOM_TYPES: RoomType[] = [
    {
        id: 'standard',
        name: 'Standard Room',
        description: 'Comfortable room with essential amenities',
        capacity: 2,
        bedType: 'Queen Bed',
        price: 130,
        amenities: ['wifi', 'tv'],
    },
    {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Spacious room with premium amenities and city view',
        capacity: 2,
        bedType: 'King Bed',
        price: 200,
        amenities: ['wifi', 'tv', 'minibar', 'bathtub'],
    },
    {
        id: 'suite',
        name: 'Suite',
        description: 'Luxurious suite with separate living area and premium services',
        capacity: 4,
        bedType: '2 Queen Beds',
        price: 350,
        amenities: ['wifi', 'tv', 'minibar', 'bathtub', 'balcony'],
    },
];

const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-4 h-4" />,
    minibar: <Coffee className="w-4 h-4" />,
    bathtub: <Bath className="w-4 h-4" />,
};

interface RoomSelectionProps {
    basePrice: number;
    selectedRoom: RoomType | null;
    onSelectRoom: (room: RoomType) => void;
}

export default function RoomSelection({ basePrice: _basePrice, selectedRoom, onSelectRoom }: RoomSelectionProps) {
    return (
        <div className="space-y-4">


            <div className="grid gap-4">
                {ROOM_TYPES.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;

                    return (
                        <button
                            key={room.id}
                            type="button"
                            onClick={() => onSelectRoom(room)}
                            className={cn(
                                'w-full text-left p-5 rounded-lg ring-2 ring-transparent transition-all duration-200',
                                isSelected
                                    ? 'ring-white shadow-md bg-brand-secondary '
                                    : 'ring-border bg-surface hover:ring-brand-secondary hover:shadow-sm'
                            )}
                        >
                            <RoomDescription room={room} isSelected={isSelected} />

                            <Amenities room={room} isSelected={isSelected} />
                            <AmenitiesIcons room={room} isSelected={isSelected} />




                        </button>
                    );
                })}
            </div>
        </div>
    );
}

const RoomDescription = ({ room, isSelected }: { room: RoomType, isSelected: boolean }) => {
    return <div className="flex justify-between items-start mb-3">
        <div>
            <h3 className={cn(
                'text-lg font-semibold',
                isSelected ? 'text-white' : 'text-primary'
            )}>{room.name}</h3>
            <p className={cn(
                'text-sm mt-1',
                isSelected ? 'text-white/80' : 'text-secondary'
            )}>{room.description}</p>
        </div>
        <div className="text-right">
            <p className={cn(
                'text-xl font-bold',
                isSelected ? 'text-white' : 'text-brand-primary'
            )}>${room.price}</p>
            <p className={cn(
                'text-xs',
                isSelected ? 'text-white/80' : 'text-secondary'
            )}>per night</p>
        </div>
    </div>
}




const AmenitiesIcons = ({ room, isSelected }: { room: RoomType, isSelected: boolean }) => {
    return <div className={cn(
        'flex gap-2 mt-3 pt-3 border-t',
        isSelected ? 'border-white/20' : 'border-border'
    )}>
        {room.amenities.map((amenity) => (
            <div
                key={amenity}
                className={cn(
                    'flex items-center gap-1 text-xs px-2 py-1 rounded',
                    isSelected
                        ? 'text-white bg-white/20'
                        : 'text-secondary bg-surface-raised'
                )}
            >
                {amenityIcons[amenity] || null}
                <span className="capitalize">{amenity}</span>
            </div>
        ))}
    </div>
}


const Amenities = ({ room, isSelected }: { room: RoomType, isSelected: boolean }) => {
    return (
        <div className={cn(
            'flex flex-wrap gap-4 text-sm',
            isSelected ? 'text-white/90' : 'text-secondary'
        )}>
            <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" />
                <span>{room.bedType}</span>
            </div>
        </div>)
};     