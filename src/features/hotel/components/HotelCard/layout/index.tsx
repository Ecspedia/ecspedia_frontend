import { ReactNode } from 'react';

// HotelCardCard - Main card container
interface HotelCardCardProps {
  children: ReactNode;
}

export function HotelCardCard({ children }: HotelCardCardProps) {
  return <div className="border-border flex gap-4 rounded-lg border p-4">{children}</div>;
}

// HotelCardContent - Content wrapper
interface HotelCardContentProps {
  children: ReactNode;
}

export function HotelCardContent({ children }: HotelCardContentProps) {
  return <div className="flex-1 flex-col">{children}</div>;
}

