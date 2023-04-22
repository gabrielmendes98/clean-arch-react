import {
  LoginFormFields,
  LoginFormService,
} from 'user/domain/interfaces/login-form.interface';
import { LoginUseCase } from 'user/use-cases/login.use-case';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { LoginForm } from '../components/login-form.component';

type Props = {
  formService: LoginFormService;
  loginUseCase: LoginUseCase;
};

export const LoginContainer = ({ formService, loginUseCase }: Props) => {
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
