import { getLocalTime } from './getLocalTime';

describe('Check local Time', () => {
  it('should calculate local time correctly', () => {
    const localTime = getLocalTime(3 * 3600);
    expect(typeof localTime).toBe('number');
  });
});
