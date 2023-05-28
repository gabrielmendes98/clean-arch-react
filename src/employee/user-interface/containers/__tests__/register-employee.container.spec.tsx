import {
  RegisterEmployeeUseCase,
  RegisterEmployeeUseCaseOutput,
} from 'employee/use-cases/register-employee.use-case';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { useEmployeeForm } from 'employee/infra/hooks/use-employee-form.hook';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { render, screen, userEvent, waitFor } from 'shared/testing/test-utils';
import { RegisterEmployeeContainer } from '../register-employee.container';

const fakeEmployee = {
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: '123123',
};

class FakeRegisterEmployeeUseCase extends RegisterEmployeeUseCase {
  async execute(): Promise<RegisterEmployeeUseCaseOutput> {
    return;
  }
}

const registerEmployeeUseCase = new FakeRegisterEmployeeUseCase(
  EmployeeRepositoryFactory.create(),
  notificationServiceMock,
);

describe('RegisterEmployeeContainer', () => {
  it('should call register employee use case and reset form on success submit', async () => {
    const registerEmployee = jest.spyOn(registerEmployeeUseCase, 'execute');
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <RegisterEmployeeContainer
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
        salary: Number(fakeEmployee.salary),
      });
    });
  });

  it('should display form errors when has validation errors', () => {
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <RegisterEmployeeContainer
          formService={formService}
          registerEmployeeUseCase={registerEmployeeUseCase}
        />
      );
    };
    render(<Component />);
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(
      screen.getByText(/Nome deve ter pelo menos 3 caracteres/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Salário deve ser um número positivo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Documento deve ser um CPF ou CNPJ valido/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Email é obrigatório/i)).toBeInTheDocument();
  });
});
