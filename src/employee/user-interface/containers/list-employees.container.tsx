import { useEffect } from 'react';
import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { ListEmployeesUseCase } from 'employee/use-cases/list-employees.use-case';
import { DeleteEmployeeFromListUseCase } from 'employee/use-cases/delete-employee-from-list.use-case';
import { EmployeeListService } from 'employee/domain/interfaces/employee-list.interface';
import { pages } from 'shared/domain/config/pages';
import { RouterService } from 'shared/application/router.port';
import { EmployeesList } from '../components/employees-list.component';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
  deleteEmployeeUseCase: DeleteEmployeeFromListUseCase;
  employeeListService: EmployeeListService;
  routerService: RouterService;
};

export const ListEmployeesView = ({
  listEmployeesUseCase,
  deleteEmployeeUseCase,
  employeeListService,
  routerService,
}: Props) => {
  const { navigate } = routerService;
  const { list, updateList } = employeeListService;

  const deleteEmployee = async (item: EmployeeListItem) => {
    await deleteEmployeeUseCase.execute({ item });
  };

  const editEmployee = (employee: EmployeeListItem) => {
    navigate(pages.updateEmployee(employee.id));
  };

  useEffect(() => {
    listEmployeesUseCase.execute().then(response => updateList(response.list));
  }, []);

  return (
    list && (
      <EmployeesList
        employees={list.items}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
    )
  );
};
