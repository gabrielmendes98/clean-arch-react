import { SignUpFormService } from 'authentication/domain/interfaces/sign-up-form.interface';
import { makeAuthService } from 'authentication/infra/factories/authentication-service.factory';
import { useSignUpForm } from 'authentication/infra/hooks/use-sign-up-form.hook';
import { SignUpUseCase } from 'authentication/use-cases/sign-up.use-case';
import { NotificationService } from 'shared/application/notification.port';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { useNotification } from 'shared/infra/adapters/notification.adapter';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
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
