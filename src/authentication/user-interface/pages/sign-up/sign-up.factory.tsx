import { SignUpFormService } from 'authentication/application/ports/sign-up-form.port';
import { SignUpUseCase } from 'authentication/application/use-cases/sign-up.use-case';
import { useSignUpForm } from 'authentication/infra/adapters/sign-up-form.adapter';
import { makeHttpClient } from 'authentication/infra/factories/http-client.factory';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { SignUpView } from './views/sign-up.view';

export const MakeSignUpPage = () => {
  const formService: SignUpFormService = useSignUpForm();
  const userStorage: UserStorageService = useUserStorage();
  const routerService: RouterService = useRouter();
  const signUpUseCase: SignUpUseCase = new SignUpUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
    userStorage,
    routerService,
  );

  return <SignUpView formService={formService} signUpUseCase={signUpUseCase} />;
};
