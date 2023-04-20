import { InvalidPasswordError } from 'authentication/domain/errors/invalid-password.error';
import { UserFactory } from 'authentication/domain/factories/user.factory';
import { AuthenticationRepository } from 'authentication/domain/interfaces/authentication-repository.interface';
import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';
import { Password } from 'authentication/domain/value-objects/password.vo';
import { pages } from 'shared/domain/config/pages';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { validator } from 'shared/domain/validator';
import { Email } from 'shared/domain/value-objects/email.vo';

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, SignUpUseCaseOutput>
{
  constructor(
    private authApiService: AuthenticationRepository,
    private storage: UserStorage,
    private routerService: RouterService,
    private notifier: NotificationService,
  ) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const { email, password, confirmPassword, name } = input;
    validator.string().required().validateAttribute(name, 'Nome');
    Email.validate(email);
    Password.validate(password);
    Password.validate(confirmPassword);
    if (password !== confirmPassword) {
      this.notifier.notify('As senhas devem ser iguais.', 'error');
      throw new InvalidPasswordError('As senhas devem ser iguais.');
    }
    const response = await this.authApiService.signUp(input);

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
        return;
      }
      default:
        throw new UnexpectedError();
    }
  }
}

export type SignUpUseCaseInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpUseCaseOutput = void;
