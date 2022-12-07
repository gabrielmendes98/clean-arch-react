import { LoginFormService } from 'authentication/application/ports/login-form.port';
import { AuthenticateUseCase } from 'authentication/application/use-cases/authenticate.use-case';
import { useLoginForm } from 'authentication/infra/adapters/login-form.adapter';
import { makeHttpClient } from 'authentication/infra/factories/http-client.factory';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { LoginView } from './views/login.view';

export const MakeLoginPage = () => {
  const formService: LoginFormService = useLoginForm();
  const userStorage: UserStorageService = useUserStorage();
  const routerService: RouterService = useRouter();
  const authenticateUseCase: AuthenticateUseCase = new AuthenticateUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
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
