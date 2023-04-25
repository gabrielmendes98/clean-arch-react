import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { DeleteEmployeeFromListUseCase } from '../delete-employee-from-list.use-case';

describe('DeleteEmployeeFromListUseCase', () => {
  const fakeItem: EmployeeListItem = {
    id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    document: '03542157015',
    email: 'some@email.com',
    name: 'some name',
    salary: 123123,
  };

  let mockEmployeeListStorage: EmployeeListStorage;

  beforeEach(() => {
    mockEmployeeListStorage = {
      list: new EmployeeList([fakeItem]),
      updateList: jest.fn(),
      addItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  it('should update list', async () => {
    const useCase = new DeleteEmployeeFromListUseCase(
      EmployeeRepositoryFactory.create(),
      mockEmployeeListStorage,
    );
    await useCase.execute({ item: fakeItem });
    expect(mockEmployeeListStorage.removeItem).toHaveBeenCalledWith(fakeItem);
  });

  it('should call repository to delete item and return success', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const deleteMethod = jest.spyOn(employeeRepository, 'delete');
    const useCase = new DeleteEmployeeFromListUseCase(
      employeeRepository,
      mockEmployeeListStorage,
    );
    await useCase.execute({ item: fakeItem });
    expect(deleteMethod).toHaveBeenCalledWith(fakeItem.id!);
  });

  it('shuold add item back to list when repository throw error', async () => {
    const employeeRepository = EmployeeRepositoryFactory.create();
    const deleteMethod = jest
      .spyOn(employeeRepository, 'delete')
      .mockReturnValue(Promise.reject(new UnexpectedError()));
    const useCase = new DeleteEmployeeFromListUseCase(
      employeeRepository,
      mockEmployeeListStorage,
    );
    await expect(
      async () => await useCase.execute({ item: fakeItem }),
    ).rejects.toThrowError();
    expect(deleteMethod).toHaveBeenCalledWith(fakeItem.id!);
    expect(mockEmployeeListStorage.list.employees).toHaveLength(1);
    expect(mockEmployeeListStorage.list.employees).toContain(fakeItem);
    expect(mockEmployeeListStorage.removeItem).toHaveBeenCalledWith(fakeItem);
  });
});
