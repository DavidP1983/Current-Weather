import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { mockData } from 'services/WeatherServices.test.utils';
import { WeatherList } from './WeatherList';

describe('Test Weather', () => {
  it('should render component WeatherList', () => {
    render(<WeatherList data={mockData} />);
  });
});
