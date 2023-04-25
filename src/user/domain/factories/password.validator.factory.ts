import { Validator } from 'shared/domain/validator';
import { Password } from '../value-objects/password.vo';
import { PasswordYupValidator } from '../validator/password.yup.validator';

export class PasswordValidatorFactory {
  public static create(): Validator<Password> {
    return new PasswordYupValidator();
  }
}
