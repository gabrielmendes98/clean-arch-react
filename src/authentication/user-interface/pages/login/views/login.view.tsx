import {
  LoginFormFields,
  LoginFormService,
} from 'authentication/application/ports/login-form.port';
import { LoginUseCase } from 'authentication/application/use-cases/login.use-case';
import { LoginForm } from 'authentication/user-interface/components/login-form/login-form.component';
import { FormStorageService } from 'shared/application/form-storage.port';
import { FormProvider } from 'shared/infra/providers/form.provider';

type Props = {
  formService: LoginFormService;
  authenticateUseCase: LoginUseCase;
};

export const LoginView = ({ formService, authenticateUseCase }: Props) => {
  const { initialValues, validations } = formService;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values }: FormStorageService<LoginFormFields>,
  ) => {
    await authenticateUseCase.execute(values);
  };

  return (
    <FormProvider
      initialValues={initialValues}
      validations={validations}
      onSubmit={onSubmit}
    >
      <LoginForm />
    </FormProvider>
  );
};
