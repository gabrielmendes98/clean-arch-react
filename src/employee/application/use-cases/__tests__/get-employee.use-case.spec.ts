import { Employee } from 'employee/domain/entities/employee.entity';
import { makeEmployeeGateway } from 'employee/infra/factories/employee-gateway.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { GetEmployeeUseCase } from '../get-employee.use-case';

describe('GetEmployeeUseCase', () => {
  it('should validate employee id', async () => {
    const validateId = jest.spyOn(UniqueEntityId, 'validate');
    const useCase = new GetEmployeeUseCase(makeEmployeeGateway());
    await useCase.execute({ id: 'ce734f82-2fac-4845-b394-66bd67e6e271' });
    expect(validateId).toHaveBeenCalled();
  });

  it('should call api and return employee entity', async () => {
    const apiService = makeEmployeeGateway();
    const getEmployee = jest.spyOn(apiService, 'getEmployee');
    const useCase = new GetEmployeeUseCase(apiService);
    const response = await useCase.execute({
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    });
    expect(getEmployee).toHaveBeenCalledWith(
      'ce734f82-2fac-4845-b394-66bd67e6e271',
    );
    expect(response.employee).toBeInstanceOf(Employee);
  });

  it('should throw unexpected error when api returns any error', async () => {
    const apiService = makeEmployeeGateway();
    jest.spyOn(apiService, 'getEmployee').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: { message: 'some error message' },
      }),
    );
    const useCase = new GetEmployeeUseCase(apiService);
    await expect(
      async () =>
        await useCase.execute({ id: 'ce734f82-2fac-4845-b394-66bd67e6e271' }),
    ).rejects.toThrow(UnexpectedError);
  });
});
