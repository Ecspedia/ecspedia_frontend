import { RefObject, useEffect, useRef } from 'react';

interface UseClickOutSideProps<E extends HTMLElement | null> {
  containerRef: RefObject<E>;
  callback: () => void;
}

export default function useClickOutSide<E extends HTMLElement | null>(useClickOutSideProps: UseClickOutSideProps<E>) {
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
