import { useEffect, useState } from 'react';
import { DeleteEmployeeUseCase } from 'employee/application/use-cases/delete-employee.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { EmployeesList } from 'employee/user-interface/components/list/employees-list.component';
import { ListBox } from 'employee/user-interface/components/list-box/list-box.component';
import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
  deleteEmployeeUseCase: DeleteEmployeeUseCase;
};

export const ListEmployeesView = ({
  listEmployeesUseCase,
  deleteEmployeeUseCase,
}: Props) => {
  const [{ list }, setList] = useState<{ list: EmployeeList }>({
    list: new EmployeeList(),
  });

  const deleteEmployee = async (employee: EmployeeListItem) => {
    setList(prev => {
      prev.list.removeItem(employee);
      console.log('list', list);
      return { list };
    });
    await deleteEmployeeUseCase.execute({ id: employee.id });
  };

  useEffect(() => {
    listEmployeesUseCase
      .execute()
      .then(responseList => setList({ list: responseList }));
  }, [listEmployeesUseCase]);

  return (
    <ListBox>
      {list && (
        <EmployeesList employees={list.items} deleteEmployee={deleteEmployee} />
      )}
    </ListBox>
  );
};
