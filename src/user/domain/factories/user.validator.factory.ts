import { Validator } from 'shared/domain/validator';
import { User } from '../entities/user.entity';
import { UserYupValidator } from '../validator/user.yup.validator';

export class UserValidatorFactory {
  public static create(): Validator<User> {
    return new UserYupValidator();
  }
}
