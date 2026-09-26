import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockData } from 'services/WeatherServices.test.utils';
import * as temperatureUtils from 'shared/lib/roundTemperature';
import { WeatherItem } from './WeatherItem';

describe('Test WeatherItem', () => {
  it('should render WeatherItem', () => {
    render(<WeatherItem weatherProps={mockData} />);
  });

  it('should call method roundTemperature', () => {
    jest.spyOn(temperatureUtils, 'roundTemperature').mockReturnValue({
      mainTemp: 23,
      tempMax: 20,
      tempMin: 19,
      feelsLike: 20,
    });
    render(<WeatherItem weatherProps={mockData} />);

    expect(temperatureUtils.roundTemperature).toHaveBeenCalledWith(
      mockData.main.temp,
      mockData.main.temp_max,
      mockData.main.temp_min,
      mockData.main.feels_like
    );
  });

  it('should render WeatherItem without props', () => {
    const weatherData = {
      ...mockData,
      weather: [],
    };
    render(<WeatherItem weatherProps={weatherData} />);

    const errorComponent = screen.getByText('Incomplete weather data');
    expect(errorComponent).toBeInTheDocument();
  });
});
