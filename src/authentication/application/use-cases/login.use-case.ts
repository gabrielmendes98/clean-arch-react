import { HttpStatusCode } from 'shared/application/http-client.port';
import { RouterService } from 'shared/application/router.port';
import { UseCase } from 'shared/application/use-case.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { pages } from 'shared/domain/config/pages';
import { User } from 'shared/domain/entities/user.entity';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { AuthenticationGateway } from '../ports/authentication-gateway.port';

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    private authApiService: AuthenticationGateway,
    private storage: UserStorageService,
    private routerService: RouterService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const { email, password } = input;
    Email.validate(email);
    Password.validate(password);
    const response = await this.authApiService.login(input);

    switch (response.statusCode) {
      case HttpStatusCode.ok: {
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
        this.routerService.navigate(pages.home);
        return {
          success: true,
        };
      }
      default:
        throw new UnexpectedError();
    }
  }
}

export type Input = {
  email: string;
  password: string;
};

export type Output = {
  success: boolean;
};