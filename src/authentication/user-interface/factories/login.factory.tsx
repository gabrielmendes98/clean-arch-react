import { LoginFormService } from 'authentication/domain/interfaces/login-form.interface';
import { makeAuthService } from 'authentication/infra/factories/authentication-service.factory';
import { useLoginForm } from 'authentication/infra/hooks/use-login-form.hook';
import { LoginUseCase } from 'authentication/use-cases/login.use-case';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
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
