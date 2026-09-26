import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { weatherServices } from 'services/WeatherServices';
import { mockData } from 'services/WeatherServices.test.utils';
import * as cityUtils from 'shared/lib/getCityFromTimeZone';
import { useWeather } from './useWeather';

describe('Test useWeather', () => {
  it('should call useEffect', () => {
    jest.spyOn(cityUtils, 'getCityFromTimeZone').mockReturnValue('Montreal');
    jest.spyOn(weatherServices, 'getCity').mockResolvedValue(mockData);
    renderHook(() => useWeather(true));
    expect(weatherServices.getCity).toHaveBeenCalledTimes(1);

    expect(weatherServices.getCity).toHaveBeenCalledWith(
      'Montreal',
      expect.any(AbortSignal)
    );
  });

  it('should not call getCity if city is not detected', () => {
    jest.spyOn(cityUtils, 'getCityFromTimeZone').mockReturnValue('');

    const { result } = renderHook(() => useWeather(true));
    expect(result.current.status).toBe('error');
    expect(result.current.errorMessage).toBe('Unable to determine your city');
    expect(weatherServices.getCity).not.toHaveBeenCalled();
  });

  it('should set data after successful request', async () => {
    jest.spyOn(weatherServices, 'getCity').mockResolvedValue(mockData);
    jest.spyOn(cityUtils, 'getCityFromTimeZone').mockReturnValue('Montreal');
    const { result } = renderHook(() => useWeather(true));
    result.current.getCity('Montreal');

    await waitFor(() => {
      expect(result.current.data).toMatchObject(mockData);
    });
  });

  it('should return error after fail request', async () => {
    jest.spyOn(cityUtils, 'getCityFromTimeZone').mockReturnValue('Montreal');
    jest
      .spyOn(weatherServices, 'getCity')
      .mockRejectedValue(new Error('Something went wrong'));

    const { result } = renderHook(() => useWeather(true));
    result.current.getCity('Montreal');

    // ждёт, пока условие станет истинным.
    await waitFor(() => {
      expect(result.current.status).toBe('error');
      expect(result.current.errorMessage).toBe('Something went wrong');
    });
  });

  it('should call useEffect if isOnline equal true', () => {
    renderHook(() => useWeather(false));
    jest.spyOn(cityUtils, 'getCityFromTimeZone').mockReturnValue('Montreal');
    jest.spyOn(weatherServices, 'getCity').mockResolvedValue(mockData);
    expect(weatherServices.getCity).toHaveBeenCalledTimes(0);
  });
});
