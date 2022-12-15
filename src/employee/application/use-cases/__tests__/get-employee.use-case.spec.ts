import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeesInMemoryHttpClient } from 'employee/infra/adapters/in-memory-http-client.adapter';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { GetEmployeeUseCase } from '../get-employee.use-case';

describe('GetEmployeeUseCase', () => {
  it('should validate employee id', async () => {
    const validateId = jest.spyOn(UniqueEntityId, 'validate');
    const useCase = new GetEmployeeUseCase(
      new EmployeesInMemoryHttpClient('fakeurl.com'),
    );
    await useCase.execute({ id: 'ce734f82-2fac-4845-b394-66bd67e6e271' });
    expect(validateId).toHaveBeenCalled();
  });

  it('should call api and return employee entity', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fakeurl.com');
    const getEmployee = jest.spyOn(httpClient, 'get');
    const useCase = new GetEmployeeUseCase(httpClient);
    const response = await useCase.execute({
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    });
    expect(getEmployee).toHaveBeenCalledWith(
      '/employees/ce734f82-2fac-4845-b394-66bd67e6e271',
    );
    expect(response).toBeInstanceOf(Employee);
  });

  it('should throw unexpected error when api returns any error', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fakeurl.com');
    jest.spyOn(httpClient, 'get').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: {},
      }),
    );
    const useCase = new GetEmployeeUseCase(httpClient);
    await expect(
      async () =>
        await useCase.execute({ id: 'ce734f82-2fac-4845-b394-66bd67e6e271' }),
    ).rejects.toThrow(UnexpectedError);
  });
});
