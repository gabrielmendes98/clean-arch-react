import { useEffect, useState } from 'react';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import {
  EmployeesList,
  Props as EmployeesListProps,
} from 'employee/user-interface/components/list/employees-list.component';
import { ListBox } from 'employee/user-interface/components/list-box/list-box.component';
import { DeleteEmployeeUseCase } from 'employee/application/use-cases/delete-employee.use-case';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
  deleteEmployeeUseCase: DeleteEmployeeUseCase;
};

export const ListEmployeesView = ({
  listEmployeesUseCase,
  deleteEmployeeUseCase,
}: Props) => {
  const [employees, setEmployees] = useState<EmployeesListProps['employees']>(
    [],
  );

  const deleteEmployee = async (id: string) => {
    await deleteEmployeeUseCase.execute({ id });
    listEmployeesUseCase.execute().then(setEmployees);
  };

  useEffect(() => {
    listEmployeesUseCase.execute().then(setEmployees);
  }, [listEmployeesUseCase]);

  return (
    <ListBox>
      <EmployeesList employees={employees} deleteEmployee={deleteEmployee} />
    </ListBox>
  );
};
