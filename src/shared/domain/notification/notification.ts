import { Errors } from '../interfaces/errors.interface';

export class Notification {
  private _errors: Errors = {};

  addError(field: string, message: string) {
    if (!this._errors[field]) {
      this._errors[field] = [];
    }
    this._errors[field].push(message);
  }

  hasErrors(): boolean {
    return Object.keys(this._errors).length > 0;
  }

  get errors(): Errors {
    return this._errors;
  }

  messages(): string {
    return Object.values(this._errors)
      .map(error => error.join(', '))
      .join(', ');
  }
}
