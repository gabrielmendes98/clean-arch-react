import {
  LoginFormFields,
  LoginFormService,
} from 'authentication/domain/interfaces/login-form.interface';
import { LoginUseCase } from 'authentication/use-cases/login.use-case';
import { FormStorageService } from 'shared/application/form-storage.port';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { LoginForm } from '../components/login-form.component';

type Props = {
  formService: LoginFormService;
  loginUseCase: LoginUseCase;
};

export const LoginView = ({ formService, loginUseCase }: Props) => {
  const { initialValues, validations } = formService;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values }: FormStorageService<LoginFormFields>,
  ) => {
    await loginUseCase.execute(values);
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
