import { User } from '../entities/user.entity';

export interface AuthenticationRepositoryLoginInput {
  email: string;
  password: string;
}
export interface AuthenticationRepositorySignUpInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthenticationRepository {
  login(data: AuthenticationRepositoryLoginInput): Promise<User>;
  signUp(data: AuthenticationRepositorySignUpInput): Promise<User>;
}
