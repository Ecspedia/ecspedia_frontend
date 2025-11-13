import { useRef, useState, useCallback, useEffect } from 'react';

interface UseHorizontalScrollOptions {
  /**
   * The percentage of the container width to scroll on each button click
   * @default 0.8
   */
  scrollPercentage?: number;
  /**
   * The delay in milliseconds before checking scroll buttons state after scrolling
   * @default 300
   */
  scrollCheckDelay?: number;
}

interface UseHorizontalScrollReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  checkScrollButtons: () => void;
}

export function useHorizontalScroll(
  options: UseHorizontalScrollOptions = {}
): UseHorizontalScrollReturn {
  const { scrollPercentage = 0.8, scrollCheckDelay = 300 } = options;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const scrollAmount = scrollContainerRef.current.clientWidth * scrollPercentage;
        const newScrollLeft =
          direction === 'left'
            ? scrollContainerRef.current.scrollLeft - scrollAmount
            : scrollContainerRef.current.scrollLeft + scrollAmount;

        scrollContainerRef.current.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });

        setTimeout(checkScrollButtons, scrollCheckDelay);
      }
    },
    [scrollPercentage, scrollCheckDelay, checkScrollButtons]
  );

  const scrollLeft = useCallback(() => scroll('left'), [scroll]);
  const scrollRight = useCallback(() => scroll('right'), [scroll]);

  // Check scroll buttons on mount and when ref changes
  useEffect(() => {
    checkScrollButtons();
  }, [checkScrollButtons]);

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    checkScrollButtons,
  };
}
