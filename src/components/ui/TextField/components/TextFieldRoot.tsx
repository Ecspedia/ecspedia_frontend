'use client';

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

  const inputId = useId();

  const contextValue = {
    value,
    onChange,
    hasValue,
    readOnly,
    onClick,
    inputId,
  };


  return (
    <TextFieldContext.Provider value={contextValue}>
      <div
        onClick={onClick}
        className={cn(
          "border-primary dark:bg-surface dark:border-border relative flex h-14 items-center gap-3 rounded-lg border bg-background px-4 transition focus-within:border-brand-primary",
          readOnly && "cursor-default opacity-80",
          className
        )}
      >
        {children}
      </div>
    </TextFieldContext.Provider>
  );
}
