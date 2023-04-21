import { Email } from 'shared/domain/value-objects/email.vo';
import { User } from '../entities/user.entity';
import { Password } from '../value-objects/password.vo';

export interface AuthenticationRepositoryLoginInput {
  email: Email;
  password: Password;
}
export interface AuthenticationRepositorySignUpInput {
  name: string;
  email: Email;
  password: Password;
  confirmPassword: Password;
}

export interface AuthenticationRepository {
  login(data: AuthenticationRepositoryLoginInput): Promise<User>;
  signUp(data: AuthenticationRepositorySignUpInput): Promise<User>;
}
