import { AppErrors } from './AppErrors';

export class HttpError extends AppErrors {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.name = 'HttpError';
  }
}
