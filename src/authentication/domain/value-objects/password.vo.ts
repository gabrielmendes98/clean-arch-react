import { InvalidPasswordError } from '../errors/invalid-password.error';
import { ValueObject } from '../../../shared/domain/value-objects/value-object';

export class Password extends ValueObject<string> {
  constructor(password: string) {
    super(password);
    Password.validate(password);
  }

  static validate(password: string) {
    const isValid = password.length >= 6;
    if (!isValid) {
      throw new InvalidPasswordError();
    }
    return true;
  }
}
