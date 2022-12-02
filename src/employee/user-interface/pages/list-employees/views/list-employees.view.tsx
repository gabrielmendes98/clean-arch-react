import { useEffect, useState } from 'react';
import { DeleteEmployeeFromListUseCase } from 'employee/application/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { EmployeesList } from 'employee/user-interface/components/list/employees-list.component';
import { ListBox } from 'employee/user-interface/components/list-box/list-box.component';
import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
  deleteEmployeeUseCase: DeleteEmployeeFromListUseCase;
};

export const ListEmployeesView = ({
  listEmployeesUseCase,
  deleteEmployeeUseCase,
}: Props) => {
  const [list, setList] = useState<EmployeeList>(new EmployeeList());

  const deleteEmployee = async (item: EmployeeListItem) => {
    await deleteEmployeeUseCase.execute({ list, item, updateList: setList });
  };

  useEffect(() => {
    listEmployeesUseCase.execute().then(setList);
  }, [listEmployeesUseCase]);

  return (
    <ListBox>
      {list && (
        <EmployeesList employees={list.items} deleteEmployee={deleteEmployee} />
      )}
    </ListBox>
  );
};
