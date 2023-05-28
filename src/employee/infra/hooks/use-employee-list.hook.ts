import { useState } from 'react';
import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { DeleteEmployeeUseCase } from 'employee/use-cases/delete-employee.use-case';

const createNewInstance = (list: EmployeeList) => {
  return new EmployeeList([...list.employees]);
};

export const useEmployeeListStorage = (
  deleteEmployeeUseCase: DeleteEmployeeUseCase,
): EmployeeListStorage => {
  const [list, setList] = useState(new EmployeeList());

  const removeItem = async (item: EmployeeListItem) => {
    const index = list.removeItem(item);
    setList(createNewInstance(list));
    try {
      await deleteEmployeeUseCase.execute({ item });
    } catch (e) {
      addItem(item, index);
    }
  };

  const addItem = (item: EmployeeListItem, index = 0) => {
    list.addItem(item, index);
    setList(createNewInstance(list));
  };

  return {
    list,
    removeItem,
    addItem,
    updateList: setList,
  };
};
