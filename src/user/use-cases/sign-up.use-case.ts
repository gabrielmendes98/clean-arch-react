import { InvalidPasswordError } from 'user/domain/errors/invalid-password.error';
import { UserRepository } from 'user/domain/interfaces/user-repository.interface';
import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import { Password } from 'user/domain/value-objects/password.vo';
import { User } from 'user/domain/entities/user.entity';
import { UserFactory } from 'user/domain/factories/user.factory';
import { pages } from 'shared/domain/config/pages';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UseCase } from 'shared/use-cases/use-case.interface';
import { NotificationError } from 'shared/domain/notification/notification.error';

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, SignUpUseCaseOutput>
{
  constructor(
    private userRepository: UserRepository,
    private storage: UserStorage,
    private routerService: RouterService,
    private notifier: NotificationService,
  ) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const email = new Email(input.email);
    const password = new Password(input.password);
    const confirmPassword = new Password(input.confirmPassword);
    const name = input.name;

    if (!email.isValid() || !password.isValid() || !confirmPassword.isValid()) {
      const error = new NotificationError({
        ...email.notification.errors,
        ...password.notification.errors,
        confirmPassword: confirmPassword.notification.errors.password,
      });
      this.notifier.notify(error.message, 'error');
      return;
    }
    if (password !== confirmPassword) {
      this.notifier.notify('As senhas devem ser iguais.', 'error');
      return;
    }
    const user = await this.userRepository.create(
      name,
      email,
      password,
      confirmPassword,
    );
    if (!user.isValid()) {
      const error = new NotificationError(user.notification.errors);
      this.notifier.notify(
        `O usuário criado é inválido: ${error.message}`,
        'error',
      );
      return;
    }
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
