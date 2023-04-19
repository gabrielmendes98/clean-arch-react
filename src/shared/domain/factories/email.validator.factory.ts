import { Validator } from 'shared/domain/validator';
import { EmailYupValidator } from '../validator/value-object-validators/email.yup.validator';
import { Email } from '../value-objects/email.vo';

export class EmailValidatorFactory {
  public static create(): Validator<Email> {
    return new EmailYupValidator();
  }
}
