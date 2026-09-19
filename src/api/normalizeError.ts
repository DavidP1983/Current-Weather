import { AppErrors } from 'shared/errors/AppErrors';
import { NetworkError } from 'shared/errors/NetworkError';

export const normalizeError = (error: unknown) => {
  if (error instanceof AppErrors) {
    return error;
  }

  return new NetworkError('No internet connection');
};
