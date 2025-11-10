import { useCallback, useEffect, useRef, useState } from 'react';

interface UseLazyListProps<T> {
  items: T[];
  initialBatchSize?: number;
  batchSize?: number;
}

export default function useLazyList<T>({
  items,
  initialBatchSize = 10,
  batchSize = 5,
}: UseLazyListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(initialBatchSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Load more items when sentinel comes into view
  const loadMore = useCallback(() => {
    if (visibleCount < items.length) {
      setVisibleCount((prev) => Math.min(prev + batchSize, items.length));
    }
  }, [visibleCount, items.length, batchSize]);

  // IntersectionObserver to detect when sentinel is visible
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Reset visible count when items change
  useEffect(() => {
    setVisibleCount(Math.min(initialBatchSize, items.length));
  }, [items, initialBatchSize]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return {
    visibleItems,
    hasMore,
    sentinelRef,
    visibleCount,
  };
}
