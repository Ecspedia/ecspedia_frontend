/**
 * Get descriptive rating label based on rating value (0-10)
 * @param rating - Rating value from 0 to 10
 * @returns Descriptive label string
 */
export const getRatingLabel = (rating?: number): string => {
  if (!rating || rating === 0) return 'No Rating';

  // Clamp rating between 0 and 10
  const clampedRating = Math.max(0, Math.min(10, rating));

  if (clampedRating >= 9) return 'Exceptional';
  if (clampedRating >= 8) return 'Excellent';
  if (clampedRating >= 7) return 'Very Good';
  if (clampedRating >= 6) return 'Good';
  if (clampedRating >= 5) return 'Average';
  if (clampedRating >= 4) return 'Fair';
  if (clampedRating >= 2) return 'Poor';
  if (clampedRating > 0) return 'Very Poor';
  return 'No Rating';
};
