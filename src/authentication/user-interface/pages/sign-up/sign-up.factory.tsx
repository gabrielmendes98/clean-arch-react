import { SignUpFormService } from 'authentication/application/ports/sign-up-form.port';
import { SignUpUseCase } from 'authentication/application/use-cases/sign-up.use-case';
import { useSignUpForm } from 'authentication/infra/adapters/sign-up-form.adapter';
import { makeAuthApiService } from 'authentication/infra/factories/authentication-api-service.factory';
import { NotificationService } from 'shared/application/notification.port';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { useNotification } from 'shared/infra/adapters/notification.adapter';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { SignUpView } from './views/sign-up.view';

export const MakeSignUpPage = () => {
  const formService: SignUpFormService = useSignUpForm();
  const userStorage: UserStorageService = useUserStorage();
  const routerService: RouterService = useRouter();
  const notifier: NotificationService = useNotification();
  const signUpUseCase: SignUpUseCase = new SignUpUseCase(
    makeAuthApiService(),
    userStorage,
    routerService,
    notifier,
  );

  return <SignUpView formService={formService} signUpUseCase={signUpUseCase} />;
};
