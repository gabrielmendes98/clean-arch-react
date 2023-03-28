import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import { pages } from 'shared/domain/config/pages';
import { User } from 'shared/domain/entities/user.entity';
import { InvalidPasswordError } from 'shared/domain/errors/invalid-password.error';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { UserStorageService } from 'shared/domain/interfaces/user-storage.interface';
import { validator } from 'shared/domain/validator';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(
    private authApiService: AuthenticationService,
    private storage: UserStorageService,
    private routerService: RouterService,
    private notifier: NotificationService,
  ) {}

  async execute(input: Input): Promise<Output> {
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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Output = {
  success: boolean;
};