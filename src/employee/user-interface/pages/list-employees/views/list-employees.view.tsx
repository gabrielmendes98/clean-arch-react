import { useEffect } from 'react';
import { EmployeeList } from 'employee/application/ports/employee-list.port';
import { DeleteEmployeeFromListUseCase } from 'employee/application/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { EmployeesList } from 'employee/user-interface/components/list/employees-list.component';
import { ListBox } from 'employee/user-interface/components/list-box/list-box.component';
import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
  deleteEmployeeUseCase: DeleteEmployeeFromListUseCase;
  employeeList: EmployeeList;
};

export const ListEmployeesView = ({
  listEmployeesUseCase,
  deleteEmployeeUseCase,
  employeeList,
}: Props) => {
  const { list, updateList } = employeeList;

  const deleteEmployee = async (item: EmployeeListItem) => {
    await deleteEmployeeUseCase.execute({ item });
  };

  useEffect(() => {
    listEmployeesUseCase.execute().then(updateList);
  }, []);

  return (
    <ListBox>
      {list && (
        <EmployeesList employees={list.items} deleteEmployee={deleteEmployee} />
      )}
    </ListBox>
  );
};
