export const minutesToHoursMinutesString = (timeInMinutes) => {
  const hours = parseInt(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
};

export const getAgeFromBirthdate = (birthdate) => {
  const datesDifference = new Date() - birthdate;
  return new Date(datesDifference).getFullYear() - 1970;
}

const getDateComponent = (num) => {
  return `${num < 10 ? '0' : ''}${num}`;
}

export const dateToString = (date) => {
  const day = getDateComponent(date.getDate());
  const month = getDateComponent(date.getMonth() + 1);
  return `${date.getFullYear()}-${month}-${day}`;
}