import { RefObject, useEffect, useRef } from 'react';

interface UseClickOutSideProps {
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>;
  callback: () => void;
}

export default function useClickOutSide(useClickOutSideProps: UseClickOutSideProps) {
  const { containerRef, callback } = useClickOutSideProps;
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        callbackRef.current(); // Call the LATEST callback via ref
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [containerRef]);
}
