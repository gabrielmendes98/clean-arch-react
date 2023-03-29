import { SignUpFormService } from 'authentication/domain/interfaces/sign-up-form.interface';
import { UserStorageService } from 'authentication/domain/interfaces/user-storage.interface';
import { makeAuthService } from 'authentication/infra/factories/authentication-service.factory';
import { useSignUpForm } from 'authentication/infra/hooks/use-sign-up-form.hook';
import { useUserStorage } from 'authentication/infra/hooks/use-user-storage.hook';
import { SignUpUseCase } from 'authentication/use-cases/sign-up.use-case';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useNotification } from 'shared/infra/hooks/use-notification.hook';
import { useRouter } from 'shared/infra/hooks/use-router.hook';

import { SignUpView } from '../containers/sign-up.container';

export const MakeSignUpPage = () => {
  const formService: SignUpFormService = useSignUpForm();
  const userStorage: UserStorageService = useUserStorage();
  const routerService: RouterService = useRouter();
  const notifier: NotificationService = useNotification();
  const signUpUseCase: SignUpUseCase = new SignUpUseCase(
    makeAuthService(),
    userStorage,
    routerService,
    notifier,
  );

  return <SignUpView formService={formService} signUpUseCase={signUpUseCase} />;
};
