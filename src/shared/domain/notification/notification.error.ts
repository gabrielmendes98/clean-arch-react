import { Errors } from '../interfaces/errors.interface';

export class NotificationError extends Error {
  constructor(public errors: Errors) {
    super(
      Object.values(errors)
        .map(error => error.join(', '))
        .join(', '),
    );
  }
}
