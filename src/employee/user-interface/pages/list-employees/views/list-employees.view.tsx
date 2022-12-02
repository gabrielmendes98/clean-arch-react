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
  const [list, setList] = useState<EmployeeList>(new EmployeeList());

  const deleteEmployee = async (employee: EmployeeListItem) => {
    // retirar essas regras de negócio daqui
    const index = list.removeItem(employee);
    setList(new EmployeeList(list.items));
    await deleteEmployeeUseCase.execute({ id: employee.id }).catch(() => {
      list.addItem(employee, index);
      setList(new EmployeeList(list.items));
    });
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
