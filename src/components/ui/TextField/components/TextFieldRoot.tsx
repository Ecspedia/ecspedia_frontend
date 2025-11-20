'use client';

import { useDarkMode } from '@/hooks';
import { cn } from '@/utils/utils';
import { ReactNode, useId } from 'react';
import { TextFieldContext } from '../context/TextFieldContext';

interface TextFieldRootProps {
  onClick?: () => void;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function TextFieldRoot({
  onClick,
  value,
  onChange,
  readOnly = false,
  className,
  children,
}: TextFieldRootProps) {
  const hasValue = Boolean(value && value.length > 0);
  const { isDarkMode } = useDarkMode();
  const inputId = useId();

  const contextValue = {
    value,
    onChange,
    isDarkMode,
    hasValue,
    readOnly,
    onClick,
    inputId,
  };
  const darkModeClass = isDarkMode === undefined ? "" : !isDarkMode ? "border-primary" : "bg-surface";



  return (
    <TextFieldContext.Provider value={contextValue}>
      <div
        onClick={onClick}
        className={cn(
          "border-border relative flex h-14 items-center gap-3 rounded-lg border bg-background px-4 transition focus-within:border-brand-primary",
          readOnly && "cursor-default opacity-80",
          darkModeClass,
          className
        )}
      >
        {children}
      </div>
    </TextFieldContext.Provider>
  );
}
