import { Array, Number, Object, String } from 'runtypes';

const Coord = Object({
  lon: Number,
  lat: Number,
});

const Weather = Object({
  description: String,
  icon: String,
});

const Main = Object({
  temp: Number,
  feels_like: Number,
  humidity: Number,
  temp_min: Number,
  temp_max: Number,
});

const Wind = Object({
  speed: Number,
});

const Sys = Object({
  sunrise: Number,
  sunset: Number,
});

export const RuntimeData = Object({
  id: Number,
  coord: Coord,
  weather: Array(Weather),
  main: Main,
  wind: Wind,
  sys: Sys,
  dt: Number,
  name: String,
  timezone: Number,
});
