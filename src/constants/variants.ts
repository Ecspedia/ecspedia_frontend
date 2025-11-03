export const variants = {
  primary: 'bg-brand-primary hover:bg-brand-primary-hover text-white',
  secondary: 'bg-brand-secondary hover:bg-brand-secondary-hover text-white',
  alert: 'bg-error hover:bg-error-dark text-white',
  success: 'bg-success hover:bg-success-dark text-white',
  disabled: 'bg-disabled cursor-not-allowed text-secondary',
  blank: '',
};
export type ButtonVariant = keyof typeof variants;
