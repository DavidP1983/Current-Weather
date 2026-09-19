import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { WeatherList } from 'components/weatherList/WeatherList';
import { mockData } from 'services/WeatherServices.test.utils';
import { Status } from 'shared/types/types';
import { CityNotFound } from 'shared/ui/cityNotFound/CityNotFound';
import { ErrorMessage } from 'shared/ui/Error/ErrorMessage';
import { Spinner } from 'shared/ui/Spinner/Spinner';
import { getWeatherContent } from './getWeatherContent';

describe('Test getWeatherContent', () => {
  it.each([
    [{ process: 'loading', data: null, errorMessage: 'Error' }, <Spinner />],
    [
      { process: 'loading', data: mockData, errorMessage: 'Error' },
      <WeatherList data={mockData} />,
    ],
    [{ process: 'idle', data: null, errorMessage: 'Error' }, <CityNotFound />],
    [
      { process: 'idle', data: mockData, errorMessage: 'Error' },
      <WeatherList data={mockData} />,
    ],
    [
      { process: 'error', data: mockData, errorMessage: 'Error' },
      <ErrorMessage errorMessage={'Error'} />,
    ],
    [{ process: 'unknown', data: mockData, errorMessage: 'Error' }, ''],
  ])(
    'should render components based on conditions for %s',
    (value, expected) => {
      const { process, data, errorMessage } = value;
      getWeatherContent(process as Status, data, errorMessage);
      render(expected);
    }
  );
});
