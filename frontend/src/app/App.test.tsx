import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as useWeatherMock from 'model/useWeather';
import { mockData } from 'services/WeatherServices.test.utils';
import App from './App';

// jest.mock('model/useWeather', () => ({
//     useWeather: jest.fn(() => ({
//         data: mockData,
//         status: 'idle',
//         errorMessage: '',
//         getCity: jest.fn(),
//     })),
// }));

describe('Test App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render App', () => {
    render(<App />);
  });

  it('should change state onclick', async () => {
    jest.spyOn(useWeatherMock, 'useWeather').mockReturnValue({
      data: mockData,
      status: 'idle',
      errorMessage: '',
      getCity: jest.fn(),
    });
    render(<App />);

    const btn = document.getElementById('fade-button') as HTMLButtonElement;
    await userEvent.click(btn);
    const menuItem = screen.getByText('search');
    await userEvent.click(menuItem);
    expect(screen.getByPlaceholderText('Search Your City')).toBeInTheDocument();
  });

  it('should render LinearProgressBar if status loading', () => {
    jest.spyOn(useWeatherMock, 'useWeather').mockReturnValue({
      data: mockData,
      status: 'loading',
      errorMessage: '',
      getCity: jest.fn(),
    });
    render(<App />);

    const linearBar = document.querySelector('.progress');
    expect(linearBar).toBeInTheDocument();
  });
});
