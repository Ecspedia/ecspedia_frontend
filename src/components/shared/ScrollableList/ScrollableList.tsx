'use client';

import { Button } from '@/components/ui';
import { useHorizontalScroll } from '@/hooks';
import useLazyList from '@/hooks/useLazyList.hook';
import { Axis } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';

interface ScrollableListProps<T> {
    items: T[];
    initialBatchSize?: number;
    batchSize?: number;
    renderItem: (item: T) => React.ReactNode;
    direction?: Axis;
    className?: string;
    showNavigation?: boolean;
}

function ScrollableList<T>({
    items,
    initialBatchSize = 10,
    batchSize = 5,
    renderItem,
    direction = 'horizontal',
    className = '',
    showNavigation = true,
}: ScrollableListProps<T>) {
    const { visibleItems, hasMore, sentinelRef } = useLazyList<T>({
        items,
        initialBatchSize,
        batchSize,
    });

    const {
        scrollContainerRef,
        canScrollLeft,
        canScrollRight,
        scrollLeft,
        scrollRight,
        checkScrollButtons,
    } = useHorizontalScroll();

    if (items.length === 0) {
        return null;
    }

    const loadingSpinner = (
        <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
    );

    if (direction === 'horizontal') {
        return (
            <div className={`relative group ${className}`}>
                {showNavigation && canScrollLeft && (
                    <Button
                        onClick={scrollLeft}
                        variant="blank"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-brand-secondary text-white backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Scroll left"
                    >
                        <Button.Icon icon={ChevronLeft} />
                    </Button>
                )}

                <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollButtons}
                    className="flex gap-4 overflow-x-auto lg:overflow-x-hidden pb-4"
                >
                    {visibleItems.map((item, index) => (
                        <div key={index}>{renderItem(item)}</div>
                    ))}
                </div>

                {showNavigation && canScrollRight && (
                    <Button
                        onClick={scrollRight}
                        variant="blank"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-secondary text-white backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Scroll right"
                    >
                        <Button.Icon icon={ChevronRight} />
                    </Button>
                )}

                {hasMore && <div ref={sentinelRef}>{loadingSpinner}</div>}
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {visibleItems.map((item, index) => (
                <div key={index}>{renderItem(item)}</div>
            ))}

            {hasMore && <div ref={sentinelRef}>{loadingSpinner}</div>}
        </div>
    );
}

export default memo(ScrollableList) as typeof ScrollableList;

