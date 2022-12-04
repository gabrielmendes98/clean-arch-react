import { LoginForm } from 'authentication/user-interface/components/login-form/login-form.component';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
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
      validations={{
        email: Email.validate,
        password: Password.validate,
      }}
      onSubmit={onSubmit}
    >
      <LoginForm />
    </FormProvider>
  );
};
