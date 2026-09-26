import '@testing-library/jest-dom';
import { ApiRequest } from 'api/apiRequest';
import {
  clearWeatherCache,
  getCachedWeather,
  WeatherServices,
} from 'services/WeatherServices';
import { mockData, weatherServicesUtils } from './WeatherServices.test.utils';

describe('Test WeatherServices', () => {
  afterEach(() => {
    clearWeatherCache();
  });

  it('should return weather data', async () => {
    const { response, mockApi } =
      await weatherServicesUtils['resolve']('Montreal');
    expect(response).toMatchObject(mockData);
    expect(mockApi.get).toHaveBeenCalled();
  });

  it('should throw/reject when API request fails', async () => {
    await expect(weatherServicesUtils['reject']('Montreal')).rejects.toThrow(
      'API request failed'
    );
  });

  it('should use cached data', async () => {
    const { response, services, mockApi } =
      await weatherServicesUtils['resolve']('Montreal');
    const secondResponse = await services.getCity('Montreal');

    expect(response).toMatchObject(mockData);
    expect(secondResponse).toMatchObject(mockData);
    expect(mockApi.get).toHaveBeenCalledTimes(1);
  });

  it('should make a new request after cache expires', async () => {
    const mockApi = new ApiRequest('');
    jest.spyOn(mockApi, 'get').mockResolvedValue(mockData);

    const services = new WeatherServices(mockApi, '/weather');

    const now = Date.now();
    jest.spyOn(Date, 'now').mockReturnValue(now);

    await services.getCity('Montreal');

    jest.spyOn(Date, 'now').mockReturnValue(now + 20_001);

    await services.getCity('Montreal');
    expect(mockApi.get).toHaveBeenCalledTimes(2);
  });

  it('should remove failed request from cache', async () => {
    await expect(weatherServicesUtils['reject']('Montreal')).rejects.toThrow(
      'API request failed'
    );
    expect(getCachedWeather('Montreal')).toBeUndefined();
  });

  it('should request trigger without city', async () => {
    await expect(weatherServicesUtils['reject']('')).rejects.toThrow(
      'Unable to determine city'
    );
  });
});
