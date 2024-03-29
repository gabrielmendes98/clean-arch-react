import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { ListEmployeesUseCase } from 'employee/use-cases/list-employees.use-case';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { render, screen, userEvent, waitFor } from 'shared/testing/test-utils';
import { ListEmployeesContainer } from '../list-employees.container';

const fakeEmployeeList = new EmployeeList([
  {
    id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    document: '03542157015',
    email: 'some@email.com',
    name: 'some name',
    salary: 123123,
  },
]);

class MockListEmployeeUseCase extends ListEmployeesUseCase {
  async execute(): Promise<{ list: EmployeeList }> {
    return { list: fakeEmployeeList };
  }
}

const employeeListServiceMock: EmployeeListStorage = {
  list: fakeEmployeeList,
  addItem: jest.fn(),
  removeItem: jest.fn(),
  updateList: jest.fn(),
};

const listEmployeesUseCase = new MockListEmployeeUseCase(
  EmployeeRepositoryFactory.create(),
);

describe('ListEmployeesContainer', () => {
  it('should call removeItem from storage', () => {
    render(
      <ListEmployeesContainer
        employeeListStorage={employeeListServiceMock}
        listEmployeesUseCase={listEmployeesUseCase}
        routerService={routerServiceMock}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /deletar/i }));
    expect(employeeListServiceMock.removeItem).toHaveBeenCalledWith(
      fakeEmployeeList.employees[0],
    );
  });

  it('should navigate to employee edit page when click on edit button', () => {
    render(
      <ListEmployeesContainer
        employeeListStorage={employeeListServiceMock}
        listEmployeesUseCase={listEmployeesUseCase}
        routerService={routerServiceMock}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(routerServiceMock.navigate).toHaveBeenCalledWith(
      '/employees/ce734f82-2fac-4845-b394-66bd67e6e271',
    );
  });

  it('should populate employee list when mount component', async () => {
    const listEmployees = jest
      .spyOn(listEmployeesUseCase, 'execute')
      .mockReturnValue(Promise.resolve({ list: fakeEmployeeList }));
    render(
      <ListEmployeesContainer
        employeeListStorage={employeeListServiceMock}
        listEmployeesUseCase={listEmployeesUseCase}
        routerService={routerServiceMock}
      />,
    );
    expect(listEmployees).toHaveBeenCalled();
    await waitFor(() => {
      expect(employeeListServiceMock.updateList).toHaveBeenCalledWith(
        fakeEmployeeList,
      );
    });
  });
});
