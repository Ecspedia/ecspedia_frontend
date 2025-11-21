import { cn } from '@/utils/utils';
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
  className?: string;
}

export function HotelCardContent({ children, className }: HotelCardContentProps) {
  return <div className={cn('flex-1 flex flex-col px-3 lg:px-2', className)}>{children}</div>;
}
