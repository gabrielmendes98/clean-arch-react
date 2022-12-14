import { useSignUpForm } from 'authentication/infra/adapters/sign-up-form.adapter';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { render, screen } from 'shared/testing/test-utils';
import { SignUpForm } from './sign-up-form.component';

describe('SignUpForm', () => {
  it('should display inputs and submit button', () => {
    const { initialValues, validations } = useSignUpForm();
    render(
      <FormProvider
        initialValues={initialValues}
        validations={validations}
        onSubmit={jest.fn()}
      >
        <SignUpForm />
      </FormProvider>,
    );
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Senha:$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toHaveAttribute(
      'type',
      'submit',
    );
  });
});
