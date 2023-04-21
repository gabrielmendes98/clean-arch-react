import { useLoginForm } from 'authentication/infra/hooks/use-login-form.hook';
import { render, screen } from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { LoginForm } from '../login-form.component';

describe('LoginForm', () => {
  it('should display inputs and submit button', () => {
    const { initialValues, validations } = useLoginForm();
    render(
      <FormProvider
        initialValues={initialValues}
        validations={validations}
        onSubmit={jest.fn()}
      >
        <LoginForm />
      </FormProvider>,
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toHaveAttribute(
      'type',
      'submit',
    );
  });
});
