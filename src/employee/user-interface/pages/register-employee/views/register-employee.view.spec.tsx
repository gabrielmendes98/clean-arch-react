import {
  Output,
  RegisterEmployeeUseCase,
} from 'employee/application/use-cases/register-employee.use-case';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { makeEmployeeApiService } from 'employee/infra/factories/employee-api-service.factory';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { render, screen, userEvent, waitFor } from 'shared/testing/test-utils';
import { EntityValidationError } from 'shared/domain/errors/validation.error';
import { RegisterEmployeeView } from './register-employee.view';

const fakeEmployee = {
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: '123123',
};

class FakeRegisterEmployeeUseCase extends RegisterEmployeeUseCase {
  async execute(): Promise<Output> {
    return {
      success: true,
    };
  }
}

const registerEmployeeUseCase = new FakeRegisterEmployeeUseCase(
  makeEmployeeApiService(),
  notificationServiceMock,
);

describe('RegisterEmployeeView', () => {
  it('should call register employee use case and reset form on success submit', async () => {
    const registerEmployee = jest.spyOn(registerEmployeeUseCase, 'execute');
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <RegisterEmployeeView
          formService={{
            ...formService,
            initialValues: fakeEmployee,
          }}
          registerEmployeeUseCase={registerEmployeeUseCase}
        />
      );
    };
    render(<Component />);
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(registerEmployee).toHaveBeenCalledWith({
        ...fakeEmployee,
        salary: 123123,
      });
    });
  });

  it('should display form errors when has validation errors', () => {
    jest.spyOn(registerEmployeeUseCase, 'execute').mockImplementation(() => {
      throw new EntityValidationError({
        name: ['Nome é obrigatório'],
        salary: ['Salário deve ser um número positivo'],
        document: ['Documento deve ser um CPF ou CNPJ valido'],
        email: ['Email inválido'],
      });
    });
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <RegisterEmployeeView
          formService={formService}
          registerEmployeeUseCase={registerEmployeeUseCase}
        />
      );
    };
    render(<Component />);
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Salário deve ser um número positivo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Documento deve ser um CPF ou CNPJ valido/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
  });
});
