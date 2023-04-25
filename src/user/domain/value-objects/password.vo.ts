import { ValueObject } from '../../../shared/domain/value-objects/value-object';
import { PasswordValidatorFactory } from '../factories/password.validator.factory';

export class Password extends ValueObject<string> {
  constructor(password: string) {
    super(password);
    this.validate();
  }

  validate() {
    PasswordValidatorFactory.create().validate(this);
  }
}
