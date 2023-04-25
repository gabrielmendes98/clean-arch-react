import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { DeleteEmployeeUseCase } from '../delete-employee.use-case';

describe('DeleteEmployeeFromListUseCase', () => {
  const fakeItem: EmployeeListItem = {
    id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    document: '03542157015',
    email: 'some@email.com',
    name: 'some name',
    salary: 123123,
  };

  it('should call repository to delete item and return success', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const deleteMethod = jest.spyOn(employeeRepository, 'delete');
    const useCase = new DeleteEmployeeUseCase(
      employeeRepository,
      notificationServiceMock,
    );
    await useCase.execute({ item: fakeItem });
    expect(deleteMethod).toHaveBeenCalledWith(fakeItem.id!);
  });

  it('should throw error if id is invalid', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const useCase = new DeleteEmployeeUseCase(
      employeeRepository,
      notificationServiceMock,
    );
    await expect(
      useCase.execute({ item: { ...fakeItem, id: '' } }),
    ).rejects.toThrowError('ID inválido.');
  });

  it('should notify error if repository throws error', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const deleteMethod = jest
      .spyOn(employeeRepository, 'delete')
      .mockReturnValue(Promise.reject(new UnexpectedError()));
    const useCase = new DeleteEmployeeUseCase(
      employeeRepository,
      notificationServiceMock,
    );
    await expect(
      async () => await useCase.execute({ item: fakeItem }),
    ).rejects.toThrowError();
    expect(deleteMethod).toHaveBeenCalledWith(fakeItem.id!);
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      'Erro ao deletar funcionário.',
      'error',
    );
  });
});
