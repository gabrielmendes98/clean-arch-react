import { LoginFormService } from 'authentication/application/ports/login-form.port';
import { LoginUseCase } from 'authentication/application/use-cases/login.use-case';
import { useLoginForm } from 'authentication/infra/adapters/login-form.adapter';
import { makeAuthApiService } from 'authentication/infra/factories/authentication-api-service.factory';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { LoginView } from './views/login.view';

export const MakeLoginPage = () => {
  const formService: LoginFormService = useLoginForm();
  const userStorage: UserStorageService = useUserStorage();
  const routerService: RouterService = useRouter();
  const authenticateUseCase: LoginUseCase = new LoginUseCase(
    makeAuthApiService(),
    userStorage,
    routerService,
  );

  return (
    <LoginView
      formService={formService}
      authenticateUseCase={authenticateUseCase}
    />
  );
};
