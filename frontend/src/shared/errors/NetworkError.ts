import { AppErrors } from './AppErrors';

export class NetworkError extends AppErrors {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}
