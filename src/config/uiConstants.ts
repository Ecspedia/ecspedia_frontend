/**
 * UI Constants
 * Centralized location for all magic numbers used across UI components
 */

// Component Dimensions
export const UI_DIMENSIONS = {
  TAB_HEIGHT_ACTIVE_PX: 4,
  TAB_HEIGHT_INACTIVE_PX: 2,

  // Icon sizes
  ICON_SIZE_SM: 16,
  ICON_SIZE_MD: 24,
  ICON_SIZE_LG: 32,

  // Hotel card dimensions
  HOTEL_IMAGE_HEIGHT: 192, // h-48 in Tailwind
  HOTEL_IMAGE_WIDTH: 256, // w-64 in Tailwind

  // Flight card dimensions
  AIRLINE_ICON_SIZE: 40,
  FLIGHT_CARD_COMPANY_LOGO_BORDER: 2
} as const;

// Animation Timings (milliseconds)
export const ANIMATION_DURATION = {
  TAB_TRANSITION: 400,
  HOVER_TRANSITION: 300,
  FADE_IN: 200,
  MODAL_TRANSITION: 300,
} as const;

// Spacing Constants (for custom spacing not in Tailwind)
export const SPACING = {
  CONTAINER_PADDING_DESKTOP: 176, // px-44 = 11rem = 176px
  CONTAINER_PADDING_MOBILE: 16,
  SECTION_GAP: 20,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 50,
  MODAL: 100,
  TOOLTIP: 200,
  NOTIFICATION: 300,
} as const;
