interface RoundTemperature {
  mainTemp: number;
  tempMax: number;
  tempMin: number;
  feelsLike: number;
}

export const roundTemperature = (
  temp: number,
  max: number,
  min: number,
  feels: number
): RoundTemperature => ({
  mainTemp: Math.round(temp),
  tempMax: Math.round(max),
  tempMin: Math.round(min),
  feelsLike: Math.round(feels),
});
