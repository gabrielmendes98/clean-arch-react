import { useSignUpForm } from 'user/infra/hooks/use-sign-up-form.hook';
import { render, renderHook, screen } from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { SignUpForm } from '../sign-up-form.component';

describe('SignUpForm', () => {
  it('should display inputs and submit button', () => {
    const { result } = renderHook(() => useSignUpForm());
    const { initialValues, validator } = result.current;
    render(
      <FormProvider
        initialValues={initialValues}
        validator={validator}
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
