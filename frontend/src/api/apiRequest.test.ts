import '@testing-library/jest-dom';
import { mockData } from 'services/WeatherServices.test.utils';
import { ApiRequest } from './apiRequest';

describe('Test ApiRequest', () => {
  it('should expand config if data', async () => {
    const controller = new AbortController();
    const mockRequest = new ApiRequest('');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
      json: jest.fn().mockResolvedValue(mockData),
    } as unknown as Response);

    const data = { args: 'value' };

    await mockRequest.request('/test', 'GET', {
      data,
      signal: controller.signal,
    });

    const config = (global.fetch as jest.Mock).mock.calls[0][1];
    expect(config).toMatchObject({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
  });

  it('should catch error if response not ok', async () => {
    const mockRequest = new ApiRequest('');

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
      json: jest.fn().mockResolvedValue(mockData),
    } as unknown as Response);

    const response = mockRequest.request('/test', 'GET');

    await expect(response).rejects.toThrow(
      'HTTP request status - 404 - Not Found'
    );
    await expect(response).rejects.toMatchObject({
      message: 'HTTP request status - 404 - Not Found',
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should return  error if response does not contain application/json', async () => {
    const mockRequest = new ApiRequest('');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'Not Found',
      headers: {
        get: jest.fn().mockReturnValue(''),
      },
      json: jest.fn().mockResolvedValue(mockData),
    } as unknown as Response);

    const response = mockRequest.request('/test', 'GET');

    await expect(response).rejects.toThrow('The server returned no data');
  });

  it('should throw error for invalid API data', async () => {
    const mockRequest = new ApiRequest('');

    const invalidData = {
      ...mockData,
      wind: {
        speed: '12',
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
      json: jest.fn().mockResolvedValue(invalidData),
    } as unknown as Response);

    await expect(mockRequest.request('/test', 'GET')).rejects.toThrow();
    // try {
    //   await mockRequest.request('/test', 'GET');
    // } catch (e) {
    //     console.dir(e, { depth: null });
    // }
  });
});
