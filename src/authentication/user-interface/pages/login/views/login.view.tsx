import { LoginForm } from 'authentication/user-interface/components/login-form/login-form.component';
import { FormProvider } from 'shared/infra/storage/form/form.provider';

export const LoginView = () => {
  console.log('login view');

  const onSubmit = () => {
    console.log('submitting');
  };

  return (
    <FormProvider
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      <LoginForm />
    </FormProvider>
  );
};
