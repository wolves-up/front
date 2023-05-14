export const minutesToHoursMinutesString = (timeInMinutes) => {
  const hours = parseInt(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
};

