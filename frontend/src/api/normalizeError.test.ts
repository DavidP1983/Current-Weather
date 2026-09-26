import '@testing-library/jest-dom';
import { NetworkError } from 'shared/errors/NetworkError';
import { normalizeError } from './normalizeError';

describe('Test NormalizeError', () => {
  it('should display internet error connection', () => {
    const result = normalizeError(new Error(), false);

    expect(result).toBeInstanceOf(NetworkError);
    expect(result.message).toBe('No internet connection');
  });

  it('should return unknown error', () => {
    const result = normalizeError('error');

    expect(result).toBeInstanceOf(NetworkError);
    expect(result.message).toBe('Unknown error');
  });
});
