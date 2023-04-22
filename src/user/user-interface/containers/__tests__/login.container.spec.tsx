import { LoginFormService } from 'user/domain/interfaces/login-form.interface';
import { useLoginForm } from 'user/infra/hooks/use-login-form.hook';
import {
  LoginUseCase,
  LoginUseCaseOutput,
} from 'user/use-cases/login.use-case';
import { UserRepositoryFactory } from 'user/infra/factories/user-repository.factory';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { render, screen, userEvent } from 'shared/testing/test-utils';
import { LoginContainer } from '../login.container';

class StubLoginUseCase extends LoginUseCase {
  async execute(): Promise<LoginUseCaseOutput> {
    return void 0;
  }
}

const makeLoginUseCase = () =>
  new StubLoginUseCase(
    UserRepositoryFactory.create(),
    userStorageServiceMock,
    routerServiceMock,
  );

describe('LoginView', () => {
  it('should call login use case with form values', async () => {
    const loginUseCase: LoginUseCase = makeLoginUseCase();
    const formService: LoginFormService = {
      ...useLoginForm(),
      initialValues: {
        email: 'valid@email.com',
        password: 'validPassword',
      },
    };

    const execute = jest.spyOn(loginUseCase, 'execute');

    render(
      <LoginContainer formService={formService} loginUseCase={loginUseCase} />,
    );

    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(execute).toHaveBeenCalledWith({
      email: 'valid@email.com',
      password: 'validPassword',
    });
  });

  it('should validate fields on blur', () => {
    const loginUseCase: LoginUseCase = makeLoginUseCase();
    render(
      <LoginContainer
        formService={useLoginForm()}
        loginUseCase={loginUseCase}
      />,
    );
    userEvent.click(screen.getByLabelText(/email/i));
    userEvent.click(screen.getByLabelText(/senha/i));
    userEvent.click(document.body);
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(
      screen.getByText(/senha deve ter pelo menos 6 caracteres/i),
    ).toBeInTheDocument();
  });

  it('should validate fields on submit', () => {
    const loginUseCase: LoginUseCase = makeLoginUseCase();
    render(
      <LoginContainer
        formService={useLoginForm()}
        loginUseCase={loginUseCase}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(
      screen.getByText(/senha deve ter pelo menos 6 caracteres/i),
    ).toBeInTheDocument();
  });
});
