import { User } from 'authentication/domain/entities/user.entity';
import { UserFactory } from 'authentication/domain/factories/user.factory';
import {
  AuthenticationRepository,
  AuthenticationRepositoryLoginInput,
  AuthenticationRepositorySignUpInput,
} from 'authentication/domain/interfaces/authentication-repository.interface';
import {
  HttpClient,
  HttpStatusCode,
} from 'shared/domain/interfaces/http-client.interface';
import {
  LoginHttpRequestDto,
  LoginHttpResponseDto,
  SignUpHttpRequestDto,
  SignUpHttpResponseDto,
} from './dto/authentication-http.dto';

export class AuthenticationHttpRepository implements AuthenticationRepository {
  constructor(private httpClient: HttpClient) {}

  async login(data: AuthenticationRepositoryLoginInput): Promise<User> {
    const response = await this.httpClient.post<
      LoginHttpRequestDto,
      LoginHttpResponseDto
    >('/session', {
      email: data.email.value,
      password: data.password.value,
    });
    if (response.statusCode !== HttpStatusCode.ok) {
      throw new Error('Não foi possível fazer login.');
    }
    return UserFactory.create(response.body);
  }

  async signUp(data: AuthenticationRepositorySignUpInput): Promise<User> {
    const response = await this.httpClient.post<
      SignUpHttpRequestDto,
      SignUpHttpResponseDto
    >('/users', {
      name: data.name,
      email: data.email.value,
      password: data.password.value,
      confirmPassword: data.confirmPassword.value,
    });
    if (response.statusCode !== HttpStatusCode.created) {
      throw new Error('Não foi possível criar o usuário.');
    }
    return UserFactory.create(response.body);
  }
}
