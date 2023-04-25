import { Email } from 'shared/domain/value-objects/email.vo';
import { User } from '../entities/user.entity';
import { Password } from '../value-objects/password.vo';

export interface UserRepository {
  get(email: Email, password: Password): Promise<User>;
  create(
    name: string,
    email: Email,
    password: Password,
    confirmPassword: Password,
  ): Promise<User>;
}
