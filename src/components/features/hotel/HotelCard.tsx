'use client';
import { Heart, Check } from 'lucide-react';
import Image from 'next/image';
import { Hotel } from '@/types/hotel';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const {
    name,
    location,
    image,
    amenities = [],
    fullyRefundable = false,
    reserveNowPayLater = false,
    rating,
    reviewCount,
    pricePerNight,
    includesTaxesAndFees = true,
  } = hotel;
  return (
    <div className="border-border flex gap-4 rounded-lg border p-4 transition-shadow hover:shadow-lg">
      <div className="group relative h-48 w-64 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={image || '/images/home/hotel_mock.avif'}
          alt={name}
          fill
          className="object-cover"
        />
        <button className="absolute top-3 right-3 rounded-full bg-white p-2 transition-transform hover:scale-110">
          <Heart className="text-primary/60 h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <h3 className="text-primary cursor-pointer text-lg font-semibold hover:underline">
            {name}
          </h3>
          <p className="text-primary/60 mt-1 text-sm">{location}</p>

          {amenities.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <svg
                className="text-primary/60 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              <span className="text-primary/60 text-sm">{amenities[0]}</span>
            </div>
          )}

          <div className="mt-3 flex flex-col gap-1">
            {fullyRefundable && (
              <span className="text-sm font-medium text-green-700">Fully refundable</span>
            )}
            {reserveNowPayLater && (
              <span className="text-sm text-green-700">Reserve now, pay later</span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="rounded bg-green-700 px-2 py-1 text-sm font-bold text-white">
              {rating?.toFixed(1) || 'N/A'}
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-sm font-semibold">Wonderful</span>
              <span className="text-primary/60 text-xs">
                {reviewCount?.toLocaleString() || 0} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <div className="text-primary mt-1 text-lg font-semibold">
            ${pricePerNight} <span className="text-primary/60 text-sm font-normal">Per night</span>
          </div>
        </div>

        {includesTaxesAndFees && (
          <div className="text-primary/60 flex items-center gap-1 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Total includes taxes and fees</span>
          </div>
        )}
      </div>
    </div>
  );
}
