import '@testing-library/jest-dom';
import * as weatherIcon from 'assets/index';
import { getWeatherIcon } from './getWeatherIcon';

describe('Test getWeatherIcon', () => {
  it.each([
    ['01d', weatherIcon.clear_d],
    ['01n', weatherIcon.clear_n],
    ['02d', weatherIcon.few_clouds_d],
    ['02n', weatherIcon.few_clouds_n],
    ['03d', weatherIcon.clouds],
    ['03n', weatherIcon.clouds],
    ['04d', weatherIcon.broken_clouds],
    ['04n', weatherIcon.broken_clouds],
    ['09d', weatherIcon.shower_rain],
    ['09n', weatherIcon.shower_rain],
    ['10d', weatherIcon.rain_d],
    ['10n', weatherIcon.rain_n],
    ['11d', weatherIcon.thunderstorm],
    ['11n', weatherIcon.thunderstorm],
    ['13d', weatherIcon.snow_d],
    ['13n', weatherIcon.snow_n],
    ['50d', weatherIcon.fog],
    ['50n', weatherIcon.fog],
  ])('should return correct icon for %s', (value, expected) => {
    expect(getWeatherIcon(value)).toBe(expected);
  });

  it('should return empty string for unknown value', () => {
    expect(getWeatherIcon('')).toBe('');
  });
});
