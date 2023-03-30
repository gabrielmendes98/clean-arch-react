import { UserFactory } from 'authentication/domain/factories/user.factory';
import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import { UserStorageService } from 'authentication/domain/interfaces/user-storage.interface';
import { Password } from 'authentication/domain/value-objects/password.vo';
import { pages } from 'shared/domain/config/pages';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { Email } from 'shared/domain/value-objects/email.vo';

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    private authApiService: AuthenticationService,
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
        const user = UserFactory.create({
          id: responseId,
          email: responseEmail,
          token: responseToken,
          name: responseName,
        });
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
