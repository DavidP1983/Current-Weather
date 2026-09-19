import { handleResponse } from 'api/handleResponse';
import { EmptyResponseError } from 'shared/errors/EmptyResponseError';
import { RuntimeData } from 'shared/validation/weather.schema';
import { HTTPRequestMethods, RequestConfig, RequestOptions } from './api.type';
import { normalizeError } from './normalizeError';

export class ApiRequest {
  baseURL: string;
  defaultHeaders: object;

  constructor(baseURL: string, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async request(
    endpoint: string,
    method: HTTPRequestMethods,
    options: RequestOptions = {}
  ) {
    const { data, headers, signal } = options;

    const config: RequestConfig = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      signal,
    };

    if (data) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      const data = await handleResponse(response);

      if (!data) {
        throw new EmptyResponseError(
          'The server returned no data',
          response.status,
          response.statusText
        );
      }
      return RuntimeData.check(data);
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        throw e;
      }

      throw normalizeError(e);
    }
  }

  get(endpoint: string, options: RequestOptions = {}) {
    return this.request(endpoint, 'GET', options);
  }
}
