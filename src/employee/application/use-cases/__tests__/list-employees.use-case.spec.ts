import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { makeEmployeeApiService } from 'employee/infra/factories/employee-api-service.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { ListEmployeesUseCase } from '../list-employees.use-case';

describe('ListEmployeesUseCase', () => {
  it('should call api and return employee list entity', async () => {
    const apiService = makeEmployeeApiService();
    const listEmployees = jest.spyOn(apiService, 'listEmployees');
    const useCase = new ListEmployeesUseCase(apiService);
    const response = await useCase.execute();
    expect(listEmployees).toHaveBeenCalled();
    expect(response).toBeInstanceOf(EmployeeList);
  });

  it('should throw unexpected error when api returns any error', async () => {
    const apiService = makeEmployeeApiService();
    jest.spyOn(apiService, 'listEmployees').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: { message: 'some error message' },
      }),
    );
    const useCase = new ListEmployeesUseCase(apiService);
    await expect(async () => await useCase.execute()).rejects.toThrow(
      UnexpectedError,
    );
  });
});
