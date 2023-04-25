import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { RegisterEmployeeUseCase } from '../register-employee.use-case';

const fakeEmployee = {
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: 123123,
};

describe('RegisterEmployeeUseCase', () => {
  it('should validate employee', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const useCase = new RegisterEmployeeUseCase(
      employeeRepository,
      notificationServiceMock,
    );
    await useCase.execute({ ...fakeEmployee, email: 'invalid email' });

    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      'Email deve ser um e-mail válido',
      'error',
    );
  });

  it('should call repository and notify user on success', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const registerEmployee = jest.spyOn(employeeRepository, 'create');
    const useCase = new RegisterEmployeeUseCase(
      employeeRepository,
      notificationServiceMock,
    );
    await useCase.execute(fakeEmployee);
    expect(registerEmployee).toHaveBeenCalledWith(
      EmployeeFactory.create(fakeEmployee),
    );
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      'Funcionário cadastrado com sucesso!',
      'success',
    );
  });

  it('should call repository and notify user on error', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const registerEmployee = jest
      .spyOn(employeeRepository, 'create')
      .mockReturnValue(Promise.reject(new UnexpectedError()));
    const useCase = new RegisterEmployeeUseCase(
      employeeRepository,
      notificationServiceMock,
    );
    await expect(
      async () => await useCase.execute(fakeEmployee),
    ).rejects.toThrow(UnexpectedError);
    expect(registerEmployee).toHaveBeenCalledWith(
      EmployeeFactory.create(fakeEmployee),
    );
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      new UnexpectedError().message,
      'error',
    );
  });
});
