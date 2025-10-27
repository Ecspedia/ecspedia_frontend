import { useRef, useState, RefObject, useMemo } from 'react';
import useClickOutSide from './useClickOutside.hooks';

export default function useExpandableFields<
  T extends string,
  E extends HTMLElement = HTMLDivElement,
>() {
  const fieldRefs = useRef<Map<T, RefObject<E>>>(new Map());
  const [expandedField, setExpandedField] = useState<T | null>(null);
  const nullRef: RefObject<HTMLElement | HTMLDivElement | null> = { current: null };

  // Get or create ref for a specific field
  const getFieldRef = (field: T): RefObject<E> => {
    if (!fieldRefs.current.has(field)) {
      const newRef = { current: null } as RefObject<E>;
      fieldRefs.current.set(field, newRef);
    }
    return fieldRefs.current.get(field)!;
  };

  // Get the ref for the currently expanded field
  const activeRef = useMemo(() => {
    if (expandedField) {
      return getFieldRef(expandedField) as RefObject<HTMLElement | HTMLDivElement | null>;
    }
    return nullRef as RefObject<HTMLElement | HTMLDivElement | null>;
  }, [expandedField]);

  useClickOutSide({
    containerRef: activeRef,
    callback: () => setExpandedField(null),
  });

  const handleFieldClick = (field: T) => {
    setExpandedField(field);
  };

  const selectField = (field: T) => {
    setExpandedField(field);
  };

  const closeField = () => {
    setExpandedField(null);
  };

  const isFieldExpanded = (field: T) => expandedField === field;

  return {
    getFieldRef,
    expandedField,
    selectField,
    handleFieldClick,
    closeField,
    isFieldExpanded,
  };
}
