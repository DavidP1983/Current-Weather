import { AppErrors } from 'shared/errors/AppErrors';
import { NetworkError } from 'shared/errors/NetworkError';

export const normalizeError = (error: unknown, isOnline = navigator.onLine) => {
  if (error instanceof AppErrors) {
    return error;
  }

  if (!isOnline) {
    return new NetworkError('No internet connection');
  }

  if (error instanceof Error) {
    return new NetworkError('Failed to Fetch');
  }

  return new NetworkError('Unknown error');
};
