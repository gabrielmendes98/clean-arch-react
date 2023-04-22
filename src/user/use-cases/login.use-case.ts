import { UserRepository } from 'user/domain/interfaces/user-repository.interface';
import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import { Password } from 'user/domain/value-objects/password.vo';
import { pages } from 'shared/domain/config/pages';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UseCase } from 'shared/use-cases/use-case.interface';

export class LoginUseCase
  implements UseCase<LoginUseCaseInput, LoginUseCaseOutput>
{
  constructor(
    private userRepository: UserRepository,
    private storage: UserStorage,
    private routerService: RouterService,
  ) {}

  async execute(input: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const { email, password } = input;
    const user = await this.userRepository.get(
      new Email(email),
      new Password(password),
    );
    this.storage.updateUser(user);
    this.routerService.navigate(pages.home);
  }
}

export type LoginUseCaseInput = {
  email: string;
  password: string;
};

export type LoginUseCaseOutput = void;
