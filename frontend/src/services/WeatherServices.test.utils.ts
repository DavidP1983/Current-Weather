import { ApiRequest } from 'api/apiRequest';
import { Data } from 'shared/types/types';
import { WeatherServices } from './WeatherServices';

export const mockData: Data = {
  id: 1,
  coord: {
    lat: 2,
    lon: 3,
  },
  weather: [{ icon: '01d', description: '01d' }],
  main: {
    temp: 23,
    feels_like: 20,
    humidity: 10,
    temp_max: 20,
    temp_min: 19,
  },
  wind: { speed: 12 },
  sys: { sunrise: 6, sunset: 5 },
  dt: 2,
  name: '',
  timezone: 3,
};

export const resolve = async (city: string) => {
  const mockApi = new ApiRequest('');
  jest.spyOn(mockApi, 'get').mockResolvedValue(mockData);

  const services = new WeatherServices(mockApi, '/weather');
  const response = await services.getCity(city);
  return {
    response,
    mockApi,
    services,
  };
};

export const reject = async (city: string) => {
  const mockApi = new ApiRequest('');
  jest.spyOn(mockApi, 'get').mockRejectedValue(new Error('API request failed'));

  const services = new WeatherServices(mockApi, '/weather');
  const response = await services.getCity(city);
  return {
    response,
    mockApi,
  };
};

export const weatherServicesUtils = {
  resolve: (city: string) => resolve(city),
  reject: (city: string) => reject(city),
};
