import { InvalidPasswordError } from 'user/domain/errors/invalid-password.error';
import { UserRepository } from 'user/domain/interfaces/user-repository.interface';
import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import { Password } from 'user/domain/value-objects/password.vo';
import { pages } from 'shared/domain/config/pages';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UseCase } from 'shared/use-cases/use-case.interface';

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
    const { email, password, confirmPassword, name } = input;
    if (password !== confirmPassword) {
      this.notifier.notify('As senhas devem ser iguais.', 'error');
      throw new InvalidPasswordError('As senhas devem ser iguais.');
    }
    const user = await this.userRepository.create(
      name,
      new Email(email),
      new Password(password),
      new Password(confirmPassword),
    );
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
