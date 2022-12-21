import { useEffect } from 'react';
import { EmployeeListService } from 'employee/application/ports/employee-list.port';
import { DeleteEmployeeFromListUseCase } from 'employee/application/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { EmployeesList } from 'employee/user-interface/components/list/employees-list.component';
import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { RouterService } from 'shared/application/router.port';
import { pages } from 'shared/domain/config/pages';

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
