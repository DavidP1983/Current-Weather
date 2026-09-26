import { roundTemperature } from './roundTemperature';

describe('Round numbers', () => {
  it('should return object with rounded nums', () => {
    const temp = 18.7;
    const max = 21.4;
    const min = 14.2;
    const feels = 17.9;
    const roundedArguments = roundTemperature(temp, max, min, feels);
    expect(roundedArguments).toMatchObject({
      mainTemp: 19,
      tempMax: 21,
      tempMin: 14,
      feelsLike: 18,
    });
  });
});
