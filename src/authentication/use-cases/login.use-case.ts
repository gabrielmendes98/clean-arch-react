import { AuthenticationRepository } from 'authentication/domain/interfaces/authentication-repository.interface';
import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';
import { Password } from 'authentication/domain/value-objects/password.vo';
import { pages } from 'shared/domain/config/pages';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { Email } from 'shared/domain/value-objects/email.vo';

export class LoginUseCase
  implements UseCase<LoginUseCaseInput, LoginUseCaseOutput>
{
  constructor(
    private authRepository: AuthenticationRepository,
    private storage: UserStorage,
    private routerService: RouterService,
  ) {}

  async execute(input: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const { email, password } = input;
    const user = await this.authRepository.login({
      email: new Email(email),
      password: new Password(password),
    });
    this.storage.updateUser(user);
    this.routerService.navigate(pages.home);
  }
}

export type LoginUseCaseInput = {
  email: string;
  password: string;
};

export type LoginUseCaseOutput = void;
