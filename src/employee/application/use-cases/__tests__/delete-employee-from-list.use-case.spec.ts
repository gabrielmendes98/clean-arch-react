import { EmployeeListService } from 'employee/application/ports/employee-list.port';
import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { makeEmployeeGateway } from 'employee/infra/factories/employee-gateway.factory';
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

  let mockEmployeeListService: EmployeeListService;

  beforeEach(() => {
    mockEmployeeListService = {
      list: new EmployeeList([fakeItem]),
      updateList: jest.fn(),
    };
  });

  it('should update list', async () => {
    const useCase = new DeleteEmployeeFromListUseCase(
      makeEmployeeGateway(),
      mockEmployeeListService,
    );
    await useCase.execute({ item: fakeItem });
    expect(mockEmployeeListService.updateList).toHaveBeenCalledWith(
      new EmployeeList([]),
    );
    expect(mockEmployeeListService.list).toMatchObject({ items: [] });
  });

  it('should call api to delete item and return success', async () => {
    const apiService = makeEmployeeGateway();
    const deleteMethod = jest.spyOn(apiService, 'deleteEmployee');
    const useCase = new DeleteEmployeeFromListUseCase(
      apiService,
      mockEmployeeListService,
    );
    const response = await useCase.execute({ item: fakeItem });
    expect(deleteMethod).toHaveBeenCalledWith(fakeItem.id);
    expect(response.success).toBeTruthy();
  });

  it('shuold add item back to list when api throw error', async () => {
    const apiService = makeEmployeeGateway();
    const deleteMethod = jest
      .spyOn(apiService, 'deleteEmployee')
      .mockReturnValue(
        Promise.resolve({
          statusCode: 500,
          body: { message: 'some error message' },
        }),
      );
    const useCase = new DeleteEmployeeFromListUseCase(
      apiService,
      mockEmployeeListService,
    );
    await expect(
      async () => await useCase.execute({ item: fakeItem }),
    ).rejects.toThrow(UnexpectedError);
    expect(deleteMethod).toHaveBeenCalledWith(fakeItem.id);
    expect(mockEmployeeListService.list.items).toHaveLength(1);
    expect(mockEmployeeListService.list.items).toContain(fakeItem);
    expect(mockEmployeeListService.updateList).toHaveBeenCalledWith(
      new EmployeeList([fakeItem]),
    );
  });
});
