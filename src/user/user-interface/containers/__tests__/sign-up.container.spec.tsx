import { SignUpFormService } from 'user/domain/interfaces/sign-up-form.interface';
import { useSignUpForm } from 'user/infra/hooks/use-sign-up-form.hook';
import {
  SignUpUseCase,
  SignUpUseCaseOutput,
} from 'user/use-cases/sign-up.use-case';
import { UserRepositoryFactory } from 'user/infra/factories/user-repository.factory';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import {
  render,
  renderHook,
  screen,
  userEvent,
} from 'shared/testing/test-utils';
import { SignUpContainer } from '../sign-up.container';

class StubSignUpUseCase extends SignUpUseCase {
  async execute(): Promise<SignUpUseCaseOutput> {
    return void 0;
  }
}

const makeSignUpUseCase = () =>
  new StubSignUpUseCase(
    UserRepositoryFactory.create(),
    userStorageServiceMock,
    routerServiceMock,
    notificationServiceMock,
  );

describe('SignUpView', () => {
  it('should call sign up use case with form values', async () => {
    const { result } = renderHook(() => useSignUpForm());
    const signUpUseCase: SignUpUseCase = makeSignUpUseCase();
    const formService: SignUpFormService = {
      ...result.current,
      initialValues: {
        name: 'valid name',
        email: 'valid@email.com',
        password: 'validPassword',
        confirmPassword: 'validPassword',
      },
    };

    const execute = jest.spyOn(signUpUseCase, 'execute');

    render(
      <SignUpContainer
        formService={formService}
        signUpUseCase={signUpUseCase}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(execute).toHaveBeenCalledWith({
      name: 'valid name',
      email: 'valid@email.com',
      password: 'validPassword',
      confirmPassword: 'validPassword',
    });
  });

  it('should validate fields on blur', () => {
    const signUpUseCase: SignUpUseCase = makeSignUpUseCase();
    const { result } = renderHook(() => useSignUpForm());
    render(
      <SignUpContainer
        formService={result.current}
        signUpUseCase={signUpUseCase}
      />,
    );
    userEvent.click(screen.getByLabelText(/nome/i));
    userEvent.click(screen.getByLabelText(/email/i));
    userEvent.click(screen.getByLabelText(/Senha:/));
    userEvent.click(screen.getByLabelText(/confirmar senha/i));
    userEvent.click(document.body);
    expect(
      screen.getByText(/Nome deve ter pelo menos 3 caracteres/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/senha deve ter pelo menos 6 caracteres/i),
    ).toHaveLength(2);
  });

  it('should validate fields on submit', () => {
    const signUpUseCase: SignUpUseCase = makeSignUpUseCase();
    const { result } = renderHook(() => useSignUpForm());
    render(
      <SignUpContainer
        formService={result.current}
        signUpUseCase={signUpUseCase}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(
      screen.getByText(/Nome deve ter pelo menos 3 caracteres/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/senha deve ter pelo menos 6 caracteres/i),
    ).toHaveLength(2);
  });
});
