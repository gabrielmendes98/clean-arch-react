import { InvalidEmailError } from '../errors/invalid-email';
import { ValueObject } from './value-object';

export class Email extends ValueObject<string> {
  constructor(email: string) {
    super(email);
    this.validate();
  }

  private validate() {
    const isValid = this.isValidEmail(this.value);
    if (!isValid) {
      throw new InvalidEmailError();
    }
  }

  private isValidEmail(email: string) {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }
}
