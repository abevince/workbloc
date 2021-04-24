export const isToday = (date: Date): boolean =>
  date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
