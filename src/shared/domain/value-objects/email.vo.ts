import { EmailValidatorFactory } from '../factories/email.validator.factory';
import { ValueObject } from './value-object';

export class Email extends ValueObject<string> {
  constructor(email: string) {
    super(email);
    this.validate();
  }

  validate() {
    EmailValidatorFactory.create().validate(this);
  }
}
