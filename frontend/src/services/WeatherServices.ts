import { ApiRequest } from 'api/apiRequest';
import { SLUG } from 'shared/config/api';
import { Data } from 'shared/types/types';

const cache = new Map<
  string,
  {
    data: Promise<Data>;
    timestamp: number;
  }
>();

// For test-only
export const clearWeatherCache = () => {
  cache.clear();
};
// For test-only
export const getCachedWeather = (city: string) => {
  return cache.get(city);
};

export class WeatherServices {
  private api: ApiRequest;
  private endpoint: string;

  constructor(api: ApiRequest, endpoint: string) {
    this.api = api;
    this.endpoint = endpoint;
  }

  getCity(cityFromInput?: string, signal?: AbortSignal): Promise<Data> {
    if (!cityFromInput) {
      throw new Error('Unable to determine city');
    }

    // Cache receiving data
    const CACHE_TTL = 2 * 10 * 1000;
    const cached = cache.get(cityFromInput);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    } else {
      const data = this.api.get(
        `${this.endpoint}?city=${encodeURIComponent(cityFromInput)}`,
        {
          signal: signal,
        }
      );

      cache.set(cityFromInput, {
        data,
        timestamp: Date.now(),
      });

      data.catch(() => {
        cache.delete(cityFromInput);
      }); // In case of an Error

      return data;
    }
  }
}

const api = new ApiRequest(process.env.REACT_APP_API_URL ?? '');
export const weatherServices = new WeatherServices(api, SLUG);

// To improve security, the base URL and API key have been moved to the backend

/* interface WeatherServicesConfig {
  api: ApiRequest;
  endpoint: string;
  apiKey: string | undefined;
}

const _APIKey = process.env.REACT_APP_API_KEY;



export class WeatherServices {
  private api: ApiRequest;
  private endpoint: string;
  private apiKey: string | undefined;

  constructor({ api, endpoint, apiKey }: WeatherServicesConfig) {
    this.api = api;
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  getCity(cityFromInput?: string, signal?: AbortSignal): Promise<Data> {
    if (!cityFromInput) {
      throw new Error('Unable to determine city');
    }

    // Cache receiving data
    const CACHE_TTL = 2 * 10 * 1000;
    const cached = cache.get(cityFromInput);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    } else {
      const params = new URLSearchParams({
        q: cityFromInput,
        units: 'metric',
        lang: 'en',
        APPID: this.apiKey ?? '',
      });

      const data = this.api.get(`${this.endpoint}?${params}`, {
        signal: signal,
      });

      cache.set(cityFromInput, {
        data,
        timestamp: Date.now(),
      });

      data.catch(() => {
        cache.delete(cityFromInput);
      }); // In case of an Error

      return data;
    }
  }
} 

const api = new ApiRequest(_apiBase);
export const weatherServices = new WeatherServices({
  api,
  endpoint: SLUG,
  apiKey: _APIKey,
});*/
