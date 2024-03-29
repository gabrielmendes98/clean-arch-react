import { Employee } from 'employee/domain/entities/employee.entity';
import {
  UpdateEmployeeUseCase,
  UpdateEmployeeUseCaseOutput,
} from 'employee/use-cases/update-employee.use-case';
import { GetEmployeeUseCase } from 'employee/use-cases/get-employee.use-case';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { useEmployeeForm } from 'employee/infra/hooks/use-employee-form.hook';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { render, screen, userEvent, waitFor } from 'shared/testing/test-utils';
import { UpdateEmployeeContainer } from '../update-employee.container';

const fakeEmployee = {
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: '123123',
};

class FakeUpdateEmployeeUseCase extends UpdateEmployeeUseCase {
  async execute(): Promise<UpdateEmployeeUseCaseOutput> {
    return;
  }
}

class FakeGetEmployeeUseCase extends GetEmployeeUseCase {
  async execute(): Promise<Employee> {
    return EmployeeFactory.create({
      document: fakeEmployee.document,
      email: fakeEmployee.email,
      id: fakeEmployee.id,
      name: fakeEmployee.name,
      salary: Number(fakeEmployee.salary),
    });
  }
}

const getEmployeeUseCase = new FakeGetEmployeeUseCase(
  EmployeeRepositoryFactory.create(),
);

const updateEmployeeUseCase = new FakeUpdateEmployeeUseCase(
  EmployeeRepositoryFactory.create(),
  routerServiceMock,
  notificationServiceMock,
);

describe('UpdateEmployeeContainer', () => {
  it('should call update employee use case when submit form', async () => {
    routerServiceMock.getUrlParams.mockReturnValue({
      id: '/ce734f82-2fac-4845-b394-66bd67e6e271',
    });
    const updateEmployee = jest.spyOn(updateEmployeeUseCase, 'execute');
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <UpdateEmployeeContainer
          formService={formService}
          routerService={routerServiceMock}
          updateEmployeeUseCase={updateEmployeeUseCase}
          getEmployeeUseCase={getEmployeeUseCase}
        />
      );
    };
    render(<Component />);
    await waitFor(() => {
      expect(screen.getByLabelText(/nome/i)).toHaveValue(fakeEmployee.name);
    });
    userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(updateEmployee).toHaveBeenCalledWith({
      ...fakeEmployee,
      salary: Number(fakeEmployee.salary),
    });
  });

  it('should display form errors when has validation errors', async () => {
    routerServiceMock.getUrlParams.mockReturnValue({ id: '' });
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <UpdateEmployeeContainer
          formService={formService}
          routerService={routerServiceMock}
          updateEmployeeUseCase={updateEmployeeUseCase}
          getEmployeeUseCase={getEmployeeUseCase}
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
