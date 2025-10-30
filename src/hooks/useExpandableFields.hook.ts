'use client';
import { useRef, useState, RefObject, useMemo } from 'react';
import useClickOutSide from './useClickOutside.hooks';

export default function useExpandableFields<
  T extends string,
  E extends HTMLElement = HTMLDivElement,
>() {
  const fieldRefs = useRef<Map<T, E | null>>(new Map());
  const [expandedField, setExpandedField] = useState<T | null>(null);

  // Get or create a ref callback for a specific field
  const getFieldRef = (field: T) => {
    return (node: E | null) => {
      if (node) {
        fieldRefs.current.set(field, node);
      } else {
        fieldRefs.current.delete(field);
      }
    };
  };

  // Get the ref for the currently expanded field
  const activeRef = useMemo(() => {
    const node = expandedField ? fieldRefs.current.get(expandedField) : null;
    return { current: node || null } as RefObject<HTMLElement | HTMLDivElement | null>;
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
