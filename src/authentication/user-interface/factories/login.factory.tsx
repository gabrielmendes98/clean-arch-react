import { LoginFormService } from 'authentication/domain/interfaces/login-form.interface';
import { UserStorageService } from 'authentication/domain/interfaces/user-storage.interface';
import { makeAuthService } from 'authentication/infra/factories/authentication-service.factory';
import { useLoginForm } from 'authentication/infra/hooks/use-login-form.hook';
import { useUserStorage } from 'authentication/infra/hooks/use-user-storage.hook';
import { LoginUseCase } from 'authentication/use-cases/login.use-case';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useRouter } from 'shared/infra/hooks/use-router.hook';

import { LoginView } from '../containers/login.container';

export const MakeLoginPage = () => {
  const formService: LoginFormService = useLoginForm();
  const userStorage: UserStorageService = useUserStorage();
  const routerService: RouterService = useRouter();
  const loginUseCase: LoginUseCase = new LoginUseCase(
    makeAuthService(),
    userStorage,
    routerService,
  );

  return <LoginView formService={formService} loginUseCase={loginUseCase} />;
};
