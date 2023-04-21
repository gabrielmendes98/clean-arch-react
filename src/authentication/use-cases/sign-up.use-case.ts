import { InvalidPasswordError } from 'authentication/domain/errors/invalid-password.error';
import { AuthenticationRepository } from 'authentication/domain/interfaces/authentication-repository.interface';
import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';
import { Password } from 'authentication/domain/value-objects/password.vo';
import { pages } from 'shared/domain/config/pages';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
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
    if (password !== confirmPassword) {
      this.notifier.notify('As senhas devem ser iguais.', 'error');
      throw new InvalidPasswordError('As senhas devem ser iguais.');
    }
    const user = await this.authApiService.signUp({
      email: new Email(email),
      password: new Password(password),
      confirmPassword: new Password(confirmPassword),
      name,
    });
    this.storage.updateUser(user);
    this.routerService.navigate(pages.home);
  }
}

export type SignUpUseCaseInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpUseCaseOutput = void;
