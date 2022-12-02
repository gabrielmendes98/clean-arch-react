import { useEffect, useState } from 'react';
import { DeleteEmployeeFromListUseCase } from 'employee/application/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { EmployeesList } from 'employee/user-interface/components/list/employees-list.component';
import { ListBox } from 'employee/user-interface/components/list-box/list-box.component';
import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/application/ports/employee-list.storage';

type Props = {
  listEmployeesUseCase: ListEmployeesUseCase;
  deleteEmployeeUseCase: DeleteEmployeeFromListUseCase;
  employeesListStorage: EmployeeListStorage;
};

export const ListEmployeesView = ({
  listEmployeesUseCase,
  deleteEmployeeUseCase,
  employeesListStorage,
}: Props) => {
  const { list, updateList } = employeesListStorage;

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
