import { useEffect, useState } from 'react';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import {
  EmployeesList,
  Props as EmployeesListProps,
} from 'employee/user-interface/components/list/employees-list.component';
import { ListBox } from 'employee/user-interface/components/list-box/list-box.component';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
};

export const ListEmployeesView = ({ listEmployeesUseCase }: Props) => {
  const [employees, setEmployees] = useState<EmployeesListProps['employees']>(
    [],
  );

  useEffect(() => {
    listEmployeesUseCase.execute().then(setEmployees);
  }, [listEmployeesUseCase]);

  return (
    <ListBox>
      <EmployeesList employees={employees} />
    </ListBox>
  );
};
