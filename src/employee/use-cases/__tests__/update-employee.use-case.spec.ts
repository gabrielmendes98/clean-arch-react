import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { UpdateEmployeeUseCase } from '../update-employee.use-case';

const fakeEmployee = {
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: 123123,
};

describe('UpdateEmployeeUseCase', () => {
  it('should validate employee', async () => {
    const useCase = new UpdateEmployeeUseCase(
      EmployeeRepositoryFactory.create(),
      routerServiceMock,
      notificationServiceMock,
    );
    await useCase.execute({ ...fakeEmployee, email: 'invalid email' });

    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      'Email deve ser um e-mail válido',
      'error',
    );
  });

  it('should call repository, notify user and go back to listing page', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const updateEmployee = jest.spyOn(employeeRepository, 'update');
    const useCase = new UpdateEmployeeUseCase(
      employeeRepository,
      routerServiceMock,
      notificationServiceMock,
    );
    await useCase.execute(fakeEmployee);
    expect(updateEmployee).toHaveBeenCalledWith(
      EmployeeFactory.create(fakeEmployee),
    );
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      'Funcionário atualizado com sucesso!',
      'success',
    );
  });

  it('should throw unexpected error when repository returns error then notify user', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const updateEmployee = jest
      .spyOn(employeeRepository, 'update')
      .mockReturnValue(Promise.reject(new UnexpectedError()));
    const useCase = new UpdateEmployeeUseCase(
      employeeRepository,
      routerServiceMock,
      notificationServiceMock,
    );
    await expect(
      async () => await useCase.execute(fakeEmployee),
    ).rejects.toThrow(UnexpectedError);
    expect(updateEmployee).toHaveBeenCalledWith(
      EmployeeFactory.create(fakeEmployee),
    );
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      new UnexpectedError().message,
      'error',
    );
  });
});
