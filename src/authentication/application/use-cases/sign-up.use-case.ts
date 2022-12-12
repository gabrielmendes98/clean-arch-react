import {
  HttpClientService,
  HttpStatusCode,
} from 'shared/application/http-client.port';
import { RouterService } from 'shared/application/router.port';
import { UseCase } from 'shared/application/use-case';
import { UserStorageService } from 'shared/application/user-storage.port';
import { PAGES } from 'shared/domain/constants/pages';
import { User } from 'shared/domain/entities/user.entity';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { validator } from 'shared/domain/validator';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { SignUpDto } from '../dto/sign-up.dto';

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(
    private httpClient: HttpClientService,
    private storage: UserStorageService,
    private routerService: RouterService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const { email, password, confirmPassword, name } = input;
    validator.string().required().validateAttribute(name, 'Nome');
    Email.validate(email);
    Password.validate(password);
    Password.validate(confirmPassword);
    const response = await this.httpClient.post<SignUpDto>('/users', {
      name,
      email,
      password,
      confirmPassword,
    });
    const {
      id: responseId,
      email: responseEmail,
      token: responseToken,
      name: responseName,
    } = response.body;
    const user = new User(
      new UniqueEntityId(responseId),
      new Email(responseEmail),
      responseToken,
      responseName,
    );
    this.storage.updateUser(user);
    this.routerService.navigate(PAGES.HOME);
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return {
          success: true,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export type Input = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Output = {
  success: boolean;
};
