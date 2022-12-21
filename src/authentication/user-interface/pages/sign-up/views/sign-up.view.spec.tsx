import { SignUpFormService } from 'authentication/application/ports/sign-up-form.port';
import {
  SignUpUseCase,
  Output,
} from 'authentication/application/use-cases/sign-up.use-case';
import { useSignUpForm } from 'authentication/infra/adapters/sign-up-form.adapter';
import { makeAuthGateway } from 'authentication/infra/factories/authentication-gateway.factory';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { render, screen, userEvent } from 'shared/testing/test-utils';
import { SignUpView } from './sign-up.view';

class StubSignUpUseCase extends SignUpUseCase {
  async execute(): Promise<Output> {
    return {
      success: true,
    };
  }
}

describe('SignUpView', () => {
  it('should call sign up use case with form values', async () => {
    const signUpUseCase: SignUpUseCase = new StubSignUpUseCase(
      makeAuthGateway(),
      userStorageServiceMock,
      routerServiceMock,
      notificationServiceMock,
    );
    const formService: SignUpFormService = {
      initialValues: {
        name: 'valid name',
        email: 'valid@email.com',
        password: 'validPassword',
        confirmPassword: 'validPassword',
      },
      validations: {
        name: jest.fn(),
        email: jest.fn(),
        password: jest.fn(),
        confirmPassword: jest.fn(),
      },
    };

    const execute = jest.spyOn(signUpUseCase, 'execute');

    render(
      <SignUpView formService={formService} signUpUseCase={signUpUseCase} />,
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
    const signUpUseCase: SignUpUseCase = new StubSignUpUseCase(
      makeAuthGateway(),
      userStorageServiceMock,
      routerServiceMock,
      notificationServiceMock,
    );
    render(
      <SignUpView
        formService={useSignUpForm()}
        signUpUseCase={signUpUseCase}
      />,
    );
    userEvent.click(screen.getByLabelText(/nome/i));
    userEvent.click(screen.getByLabelText(/email/i));
    userEvent.click(screen.getByLabelText(/Senha:/));
    userEvent.click(screen.getByLabelText(/confirmar senha/i));
    userEvent.click(document.body);
    expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/senha inválida/i)).toHaveLength(2);
  });

  it('should validate fields on submit', () => {
    const signUpUseCase: SignUpUseCase = new StubSignUpUseCase(
      makeAuthGateway(),
      userStorageServiceMock,
      routerServiceMock,
      notificationServiceMock,
    );
    render(
      <SignUpView
        formService={useSignUpForm()}
        signUpUseCase={signUpUseCase}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/senha inválida/i)).toHaveLength(2);
  });
});
