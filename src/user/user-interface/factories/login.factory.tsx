import { LoginFormService } from 'user/domain/interfaces/login-form.interface';
import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import { useLoginForm } from 'user/infra/hooks/use-login-form.hook';
import { useUserStorage } from 'user/infra/hooks/use-user-storage.hook';
import { LoginUseCase } from 'user/use-cases/login.use-case';
import { UserRepositoryFactory } from 'user/infra/factories/user-repository.factory';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useRouter } from 'shared/infra/hooks/use-router.hook';

import { LoginContainer } from '../containers/login.container';

export const MakeLoginContainer = () => {
  const formService: LoginFormService = useLoginForm();
  const userStorage: UserStorage = useUserStorage();
  const routerService: RouterService = useRouter();
  const loginUseCase: LoginUseCase = new LoginUseCase(
    UserRepositoryFactory.create(),
    userStorage,
    routerService,
  );

  return (
    <LoginContainer formService={formService} loginUseCase={loginUseCase} />
  );
};
