'use client';

import { memo, useRef, useState } from 'react';
import { Hotel } from '@/types/api';
import useLazyList from '@/hooks/useLazyList.hook';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

interface HotelCardListProps {
  hotels: Hotel[];
  initialBatchSize?: number;
  batchSize?: number;
  renderItem: (hotel: Hotel) => React.ReactNode;
  direction?: 'vertical' | 'horizontal';
}

function HotelCardList({
  hotels,
  initialBatchSize = 10,
  batchSize = 5,
  renderItem,
  direction = 'vertical',
}: HotelCardListProps) {
  const { visibleItems, hasMore, sentinelRef } = useLazyList<Hotel>({
    items: hotels,
    initialBatchSize,
    batchSize,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  if (hotels.length === 0) {
    return null;
  }

  if (direction === 'horizontal') {
    return (
      <div className="relative group">
        {canScrollLeft && (
          <Button
            onClick={() => scroll('left')}
            variant="blank"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
             bg-brand-secondary text-white backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button.Icon icon={ChevronLeft} />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex gap-4 overflow-x-hidden pb-4"
        >
          {visibleItems.map((hotel) => renderItem(hotel))}
        </div>

        {canScrollRight && (
          <Button
            onClick={() => scroll('right')}
            variant="blank"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-secondary text-white backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button.Icon icon={ChevronRight} />
          </Button>
        )}

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    );
  }

  // Vertical layout
  return (
    <div className="space-y-4">
      {visibleItems.map((hotel) => renderItem(hotel))}

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}

export default memo(HotelCardList);
