// The Mifflin-St. Jeor equation calculates your basal metabolic rate (BMR), 
// and its results are based on an estimated average.
export const BMR = (isMale, age, height, weight) => {
  return parseInt(10 * weight + 6.25 * height - 5 * age + (isMale ? 5 : -161));
}

export const getEnergyFromActivityLevel = (level, bmr) => {
  switch(level) {
    case 0:
      return 0;
    case 1:
      return parseInt(bmr * 0.2);
    case 2:
      return parseInt(bmr * 0.375);
    case 3:
      return parseInt(bmr * 0.5);
    case 4:
      return parseInt(bmr * 0.9);
    default:
      return 0;
  }
}

export const proteinsInGramsFromEnergy = (energy) => {
  return parseInt(energy * 0.25 / 4 * 10) / 10;
}

export const carbohydratesInGramsFromEnergy = (energy) => {
  return parseInt(energy * 0.4 / 4 * 10) / 10;
}

export const fatsInGramsFromEnergy = (energy) => {
  return parseInt(energy * 0.35 / 9 * 10) / 10;
}