import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeesInMemoryHttpClient } from 'employee/infra/adapters/in-memory-http-client.adapter';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { ListEmployeesUseCase } from '../list-employees.use-case';

describe('ListEmployeesUseCase', () => {
  it('should call api and return employee list entity', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fakeurl.com');
    const listEmployees = jest.spyOn(httpClient, 'get');
    const useCase = new ListEmployeesUseCase(httpClient);
    const response = await useCase.execute();
    expect(listEmployees).toHaveBeenCalledWith('/employees');
    expect(response).toBeInstanceOf(EmployeeList);
  });

  it('should throw unexpected error when api returns any error', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fakeurl.com');
    jest.spyOn(httpClient, 'get').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: {},
      }),
    );
    const useCase = new ListEmployeesUseCase(httpClient);
    await expect(async () => await useCase.execute()).rejects.toThrow(
      UnexpectedError,
    );
  });
});
