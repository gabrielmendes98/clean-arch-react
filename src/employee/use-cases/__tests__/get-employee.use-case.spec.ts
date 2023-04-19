import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { NotificationError } from 'shared/domain/notification/notification.error';
import { GetEmployeeUseCase } from '../get-employee.use-case';

describe('GetEmployeeUseCase', () => {
  it('should validate employee id', async () => {
    const useCase = new GetEmployeeUseCase(EmployeeRepositoryFactory.create());
    expect(() => useCase.execute({ id: 'aa' })).rejects.toThrowError(
      NotificationError,
    );
  });

  it('should call repository and return employee entity', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const getEmployee = jest.spyOn(employeeRepository, 'get');
    const useCase = new GetEmployeeUseCase(employeeRepository);
    const response = await useCase.execute({
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    });
    expect(getEmployee).toHaveBeenCalledWith(
      'ce734f82-2fac-4845-b394-66bd67e6e271',
    );
    expect(response).toBeInstanceOf(Employee);
  });

  it('should throw error when not found employee or repository throws error', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    jest
      .spyOn(employeeRepository, 'get')
      .mockReturnValue(Promise.reject(new UnexpectedError()));
    const useCase = new GetEmployeeUseCase(employeeRepository);
    await expect(
      async () =>
        await useCase.execute({ id: 'ce734f82-2fac-4845-b394-66bd67e6e271' }),
    ).rejects.toThrow(UnexpectedError);
  });
});
