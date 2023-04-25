import { SignUpFormService } from 'user/domain/interfaces/sign-up-form.interface';
import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import { useSignUpForm } from 'user/infra/hooks/use-sign-up-form.hook';
import { useUserStorage } from 'user/infra/hooks/use-user-storage.hook';
import { SignUpUseCase } from 'user/use-cases/sign-up.use-case';
import { UserRepositoryFactory } from 'user/infra/factories/user-repository.factory';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useNotification } from 'shared/infra/hooks/use-notification.hook';
import { useRouter } from 'shared/infra/hooks/use-router.hook';

import { SignUpContainer } from '../containers/sign-up.container';

export const MakeSignUpContainer = () => {
  const formService: SignUpFormService = useSignUpForm();
  const userStorage: UserStorage = useUserStorage();
  const routerService: RouterService = useRouter();
  const notifier: NotificationService = useNotification();
  const signUpUseCase: SignUpUseCase = new SignUpUseCase(
    UserRepositoryFactory.create(),
    userStorage,
    routerService,
    notifier,
  );

  return (
    <SignUpContainer formService={formService} signUpUseCase={signUpUseCase} />
  );
};
