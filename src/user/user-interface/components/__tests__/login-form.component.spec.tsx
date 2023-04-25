import { useLoginForm } from 'user/infra/hooks/use-login-form.hook';
import { render, renderHook, screen } from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { LoginForm } from '../login-form.component';

describe('LoginForm', () => {
  it('should display inputs and submit button', () => {
    const { result } = renderHook(() => useLoginForm());
    const { initialValues, validator } = result.current;
    render(
      <FormProvider
        initialValues={initialValues}
        validator={validator}
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
