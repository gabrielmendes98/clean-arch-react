import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { makeEmployeeService } from 'employee/infra/factories/employee-service.factory';
import {
  DeleteEmployeeFromListUseCase,
  Output,
} from 'employee/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/use-cases/list-employees.use-case';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { render, screen, userEvent, waitFor } from 'shared/testing/test-utils';
import { ListEmployeesView } from '../list-employees.container';

const fakeEmployeeList = new EmployeeList([
  {
    id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    document: '03542157015',
    email: 'some@email.com',
    name: 'some name',
    salary: 123123,
  },
]);

class MockDeleteEmployeeUseCase extends DeleteEmployeeFromListUseCase {
  async execute(): Promise<Output> {
    jest.fn();
    return { success: true };
  }
}

class MockListEmployeeUseCase extends ListEmployeesUseCase {
  async execute(): Promise<{ list: EmployeeList }> {
    return { list: fakeEmployeeList };
  }
}

const employeeListServiceMock: EmployeeListStorage = {
  list: fakeEmployeeList,
  updateList: jest.fn(),
};

const deleteEmployeeUseCase = new MockDeleteEmployeeUseCase(
  makeEmployeeService(),
  employeeListServiceMock,
);
const listEmployeesUseCase = new MockListEmployeeUseCase(makeEmployeeService());

describe('ListEmployeesView', () => {
  it('should call delete employee use case', () => {
    const deleteEmployee = jest.spyOn(deleteEmployeeUseCase, 'execute');
    render(
      <ListEmployeesView
        deleteEmployeeUseCase={deleteEmployeeUseCase}
        employeeListStorage={employeeListServiceMock}
        listEmployeesUseCase={listEmployeesUseCase}
        routerService={routerServiceMock}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /deletar/i }));
    expect(deleteEmployee).toHaveBeenCalledWith({
      item: fakeEmployeeList.employees[0],
    });
  });

  it('should navigate to employee edit page when click on edit button', () => {
    render(
      <ListEmployeesView
        deleteEmployeeUseCase={deleteEmployeeUseCase}
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
      <ListEmployeesView
        deleteEmployeeUseCase={deleteEmployeeUseCase}
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
