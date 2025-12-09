export enum GuestRating {
  ANY = 'any',
  WONDERFUL_9_PLUS = '9+',
  VERY_GOOD_8_PLUS = '8+',
  GOOD_7_PLUS = '7+',
}
export const getRatingByFilterLabels = (rating: GuestRating) => {
  switch (rating) {
    case GuestRating.ANY:
      return 0;
    case GuestRating.WONDERFUL_9_PLUS:
      return 9;
    case GuestRating.VERY_GOOD_8_PLUS:
      return 8;
    case GuestRating.GOOD_7_PLUS:
      return 7;
  }
};
