import { UserRepository } from 'user/domain/interfaces/user-repository.interface';
import { User } from 'user/domain/entities/user.entity';
import { UserFactory } from 'user/domain/factories/user.factory';
import { Password } from 'user/domain/value-objects/password.vo';
import {
  HttpClient,
  HttpStatusCode,
} from 'shared/domain/interfaces/http-client.interface';
import { Email } from 'shared/domain/value-objects/email.vo';
import {
  LoginHttpRequestDto,
  LoginHttpResponseDto,
  SignUpHttpRequestDto,
  SignUpHttpResponseDto,
} from './dto/user-http.dto';

export class UserHttpRepository implements UserRepository {
  constructor(private httpClient: HttpClient) {}

  async get(email: Email, password: Password): Promise<User> {
    const response = await this.httpClient.post<
      LoginHttpRequestDto,
      LoginHttpResponseDto
    >('/session', {
      email: email.value,
      password: password.value,
    });
    if (response.statusCode !== HttpStatusCode.ok) {
      throw new Error('Não foi possível fazer login.');
    }
    return UserFactory.create(response.body);
  }

  async create(
    name: string,
    email: Email,
    password: Password,
    confirmPassword: Password,
  ): Promise<User> {
    const response = await this.httpClient.post<
      SignUpHttpRequestDto,
      SignUpHttpResponseDto
    >('/users', {
      name: name,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
    if (response.statusCode !== HttpStatusCode.created) {
      throw new Error('Não foi possível criar o usuário.');
    }
    return UserFactory.create(response.body);
  }
}
