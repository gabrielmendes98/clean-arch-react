import { LoginFormService } from 'authentication/application/ports/login-form.port';
import {
  LoginUseCase,
  Output,
} from 'authentication/application/use-cases/login.use-case';
import { useLoginForm } from 'authentication/infra/adapters/login-form.adapter';
import { makeAuthGateway } from 'authentication/infra/factories/authentication-gateway.factory';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { render, screen, userEvent } from 'shared/testing/test-utils';
import { LoginView } from './login.view';

class StubLoginUseCase extends LoginUseCase {
  async execute(): Promise<Output> {
    return {
      success: true,
    };
  }
}

const makeLoginUseCase = () =>
  new StubLoginUseCase(
    makeAuthGateway(),
    userStorageServiceMock,
    routerServiceMock,
  );

describe('LoginView', () => {
  it('should call login use case with form values', async () => {
    const loginUseCase: LoginUseCase = makeLoginUseCase();
    const formService: LoginFormService = {
      initialValues: {
        email: 'valid@email.com',
        password: 'validPassword',
      },
      validations: {
        email: jest.fn(),
        password: jest.fn(),
      },
    };

    const execute = jest.spyOn(loginUseCase, 'execute');

    render(<LoginView formService={formService} loginUseCase={loginUseCase} />);

    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(execute).toHaveBeenCalledWith({
      email: 'valid@email.com',
      password: 'validPassword',
    });
  });

  it('should validate fields on blur', () => {
    const loginUseCase: LoginUseCase = makeLoginUseCase();
    render(
      <LoginView formService={useLoginForm()} loginUseCase={loginUseCase} />,
    );
    userEvent.click(screen.getByLabelText(/email/i));
    userEvent.click(screen.getByLabelText(/senha/i));
    userEvent.click(document.body);
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/senha inválida/i)).toBeInTheDocument();
  });

  it('should validate fields on submit', () => {
    const loginUseCase: LoginUseCase = makeLoginUseCase();
    render(
      <LoginView formService={useLoginForm()} loginUseCase={loginUseCase} />,
    );
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/senha inválida/i)).toBeInTheDocument();
  });
});
