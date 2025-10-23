import { useRef, useState, RefObject } from 'react';
import useClickOutSide from './useClickOutside.hooks';

export default function useExpandableFields<
  T extends string,
  E extends HTMLElement = HTMLDivElement,
>() {
  const containerRef = useRef<E>(null);
  const [expandedField, setExpandedField] = useState<T | null>(null);

  useClickOutSide({
    containerRef: containerRef as RefObject<HTMLElement | HTMLDivElement | null>,
    callback: () => setExpandedField(null),
  });

  const selectField = (field: T) => {
    setExpandedField(field);
  };

  const closeField = () => {
    setExpandedField(null);
  };

  const isFieldExpanded = (field: T) => expandedField === field;

  return {
    containerRef,
    expandedField,
    selectField: selectField,
    closeField,
    isFieldExpanded,
  };
}
