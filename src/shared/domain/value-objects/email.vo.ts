import { InvalidEmailError } from '../errors/invalid-email.error';
import { ValueObject } from './value-object';

export class Email extends ValueObject<string> {
  constructor(email: string) {
    super(email);
    Email.validate(email);
  }

  static validate(email: string) {
    const isValid = this.isValidEmail(email);
    if (!isValid) {
      throw new InvalidEmailError();
    }
  }

  private static isValidEmail(email: string) {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }
}
