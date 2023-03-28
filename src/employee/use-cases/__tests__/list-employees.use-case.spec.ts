import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { makeEmployeeRepository } from 'employee/infra/factories/employee-repository.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { ListEmployeesUseCase } from '../list-employees.use-case';

describe('ListEmployeesUseCase', () => {
  it('should call api and return employee list entity', async () => {
    const employeeRepository = makeEmployeeRepository();
    const listEmployees = jest.spyOn(employeeRepository, 'list');
    const useCase = new ListEmployeesUseCase(employeeRepository);
    const response = await useCase.execute();
    expect(listEmployees).toHaveBeenCalled();
    expect(response.list).toBeInstanceOf(EmployeeList);
  });

  it('should throw unexpected error when api returns any error', async () => {
    const employeeRepository = makeEmployeeRepository();
    jest.spyOn(employeeRepository, 'list').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: { message: 'some error message' },
      }),
    );
    const useCase = new ListEmployeesUseCase(employeeRepository);
    await expect(async () => await useCase.execute()).rejects.toThrow(
      UnexpectedError,
    );
  });
});
