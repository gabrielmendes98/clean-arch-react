import {
  LoginFormFields,
  LoginFormService,
} from 'authentication/application/ports/login-form.port';
import { LoginForm } from 'authentication/user-interface/components/login-form/login-form.component';
import {
  FormProvider,
  FormProviderData,
} from 'shared/infra/storage/form/form.provider';

type Props = {
  formService: LoginFormService;
};

export const LoginView = ({ formService }: Props) => {
  const { initialValues, validations } = formService;

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    { values }: FormProviderData<LoginFormFields>,
  ) => {
    console.log(values);
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
