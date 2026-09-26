import { AppErrors } from './AppErrors';

export class CityDetectionError extends AppErrors {
  constructor(message: string) {
    super(message);
    this.name = 'CityDetectionError';
  }
}
