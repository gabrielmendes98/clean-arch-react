import { GetEmployeeUseCase } from 'employee/application/use-cases/get-employee.use-case';
import {
  Output,
  UpdateEmployeeUseCase,
} from 'employee/application/use-cases/update-employee.use-case';
import { Employee } from 'employee/domain/entities/employee.entity';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { makeEmployeeApiService } from 'employee/infra/factories/employee-api-service.factory';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { render, screen, userEvent, waitFor } from 'shared/testing/test-utils';
import { EntityValidationError } from 'shared/domain/errors/validation.error';
import { UpdateEmployeeView } from './update-employee.view';

const fakeEmployee = {
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: '123123',
};

class FakeUpdateEmployeeUseCase extends UpdateEmployeeUseCase {
  async execute(): Promise<Output> {
    return {
      success: true,
    };
  }
}

class FakeGetEmployeeUseCase extends GetEmployeeUseCase {
  async execute(): Promise<Employee> {
    return new Employee({
      document: new Document(fakeEmployee.document),
      email: new Email(fakeEmployee.email),
      id: new UniqueEntityId(fakeEmployee.id),
      name: fakeEmployee.name,
      salary: Number(fakeEmployee.salary),
    });
  }
}

const getEmployeeUseCase = new FakeGetEmployeeUseCase(makeEmployeeApiService());

const updateEmployeeUseCase = new FakeUpdateEmployeeUseCase(
  makeEmployeeApiService(),
  routerServiceMock,
  notificationServiceMock,
);

describe('UpdateEmployeeView', () => {
  it('should call update employee use case when submit form', async () => {
    const updateEmployee = jest.spyOn(updateEmployeeUseCase, 'execute');
    const Component = () => {
      const formService = useEmployeeForm();
      return (
        <UpdateEmployeeView
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
      salary: 123123,
    });
  });

  it('should display form errors when has validation errors', async () => {
    jest.spyOn(updateEmployeeUseCase, 'execute').mockImplementation(() => {
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
        <UpdateEmployeeView
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
