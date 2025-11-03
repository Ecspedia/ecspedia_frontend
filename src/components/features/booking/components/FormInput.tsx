/**
 * Form Input Component
 *
 * Reusable input field with consistent styling and error handling
 */

'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface BaseInputProps {
  label: string;
  error?: FieldError;
  required?: boolean;
}

interface TextInputProps extends BaseInputProps {
  type?: 'text' | 'email' | 'tel';
  register: UseFormRegisterReturn;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;
  variant?: 'default' | 'mono' | 'uppercase';
}

interface TextAreaProps extends BaseInputProps {
  register: UseFormRegisterReturn;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

/**
 * Standard text input with label and error display
 */
export function FormInput({
  label,
  error,
  required = false,
  type = 'text',
  register,
  inputProps = {},
  variant = 'default',
}: TextInputProps) {
  const variantClasses = {
    default: '',
    mono: 'font-mono',
    uppercase: 'uppercase',
  };

  return (
    <div>
      <label htmlFor={register.name} className="block text-sm font-medium mb-1">
        {label} {required && '*'}
      </label>
      <input
        id={register.name}
        type={type}
        {...register}
        {...inputProps}
        className={`
          bg-background
          w-full px-3 py-2 border border-border rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary
          ${variantClasses[variant]}
          ${inputProps.className || ''}
        `}
      />
      {error && (
        <p className="text-error text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

/**
 * Textarea input with label and error display
 */
export function FormTextArea({
  label,
  error,
  required = false,
  register,
  textareaProps = {},
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={register.name} className="block text-sm font-medium mb-1">
        {label} {required && '*'}
      </label>
      <textarea
        id={register.name}
        {...register}
        {...textareaProps}
        className={`
          bg-background
          w-full px-3 py-2 border border-border rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary resize-none
          ${textareaProps.className || ''}
        `}
      />
      {error && (
        <p className="text-error text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
