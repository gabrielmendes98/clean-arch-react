import { LoginFormService } from 'authentication/domain/interfaces/login-form.interface';
import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';
import { AuthServiceFactory } from 'authentication/infra/factories/authentication-service.factory';
import { useLoginForm } from 'authentication/infra/hooks/use-login-form.hook';
import { useUserStorage } from 'authentication/infra/hooks/use-user-storage.hook';
import { LoginUseCase } from 'authentication/use-cases/login.use-case';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useRouter } from 'shared/infra/hooks/use-router.hook';

import { LoginContainer } from '../containers/login.container';

export const MakeLoginContainer = () => {
  const formService: LoginFormService = useLoginForm();
  const userStorage: UserStorage = useUserStorage();
  const routerService: RouterService = useRouter();
  const loginUseCase: LoginUseCase = new LoginUseCase(
    AuthServiceFactory.create(),
    userStorage,
    routerService,
  );

  return (
    <LoginContainer formService={formService} loginUseCase={loginUseCase} />
  );
};
