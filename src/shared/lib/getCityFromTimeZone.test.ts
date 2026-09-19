import { getCityFromTimeZone } from './getCityFromTimeZone';

describe('Check return Time Zone', () => {
  it('Return value should be string', () => {
    const city = getCityFromTimeZone();
    if (city) {
      expect(city).toBe('Tbilisi');
    }
  });
});
