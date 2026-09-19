import { match } from 'ts-pattern';
import { AppErrors } from './AppErrors';
import { HttpError } from './HttpError';

export const errorsHandler = (error: unknown): string => {
  if (error instanceof HttpError) {
    return match(error.status)
      .with(404, () => 'City not found')
      .with(500, () => 'Server Error')
      .otherwise(() => 'Something went wrong');
  }

  if (error instanceof AppErrors) {
    return error.message;
  }

  return 'Something went wrong';
};
