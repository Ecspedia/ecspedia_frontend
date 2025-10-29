export const getRatingLabel = (rating?: number): string => {
  if (!rating) return 'No rating';
  if (rating >= 4.5) return 'Exceptional';
  if (rating >= 4) return 'Wonderful';
  if (rating >= 3) return 'Very good';
  if (rating >= 2) return 'Good';
  if (rating >= 1) return 'Average';
  return 'Bad';
};

