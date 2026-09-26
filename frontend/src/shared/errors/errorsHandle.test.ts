import '@testing-library/jest-dom';
import { EmptyResponseError } from './EmptyResponseError';
import { errorsHandler } from './errorsHandler';
import { HttpError } from './HttpError';

describe('Test errorsHandler', () => {
  it.each([
    [new HttpError('', 404, ''), 'City not found'],
    [new HttpError('', 500, ''), 'Server Error'],
    [new HttpError('', 403, ''), 'Something went wrong'],
    [
      new EmptyResponseError('The server returned no data', 200, ''),
      'The server returned no data',
    ],
  ])(
    'should return correct message for different errors',
    (value, expected) => {
      expect(errorsHandler(value)).toBe(expected);
    }
  );
});
