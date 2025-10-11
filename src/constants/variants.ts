export const variants = {
  primary: "bg-primary hover:bg-primary/90",
  secondary: "bg-secondary hover:bg-secondary/90",
  alert: "bg-red-600 hover:bg-red-700",
  success: "bg-green-600 hover:bg-green-700",
};
export type ButtonVariant = keyof typeof variants;
