export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const getRoomTypeBadgeColor = (roomType: string) => {
  switch (roomType) {
    case 'SUITE':
      return 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30';
    case 'DELUXE':
      return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30';
    default:
      return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30';
  }
};
