import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { ListEmployeesUseCase } from '../list-employees.use-case';

describe('ListEmployeesUseCase', () => {
  it('should call repository and return employee list entity', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const listEmployees = jest.spyOn(employeeRepository, 'list');
    const useCase = new ListEmployeesUseCase(employeeRepository);
    const response = await useCase.execute();
    expect(listEmployees).toHaveBeenCalled();
    expect(response.list).toBeInstanceOf(EmployeeList);
  });

  it('should throw unexpected error when api returns any error', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    jest
      .spyOn(employeeRepository, 'list')
      .mockReturnValue(Promise.reject(new UnexpectedError()));
    const useCase = new ListEmployeesUseCase(employeeRepository);
    await expect(async () => await useCase.execute()).rejects.toThrow(
      UnexpectedError,
    );
  });
});
