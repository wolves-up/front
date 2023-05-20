const apiKey = '9ahOunuje6lDNX2yRj03fi5xsqR8QdTxXJGAhb4b';
export const requestString = (query) => {
  return `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`;
}