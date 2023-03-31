import { useState } from 'react';
import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';

export const useEmployeeListStorage = (): EmployeeListStorage => {
  const [list, setList] = useState(new EmployeeList());

  const removeItem = (item: EmployeeListItem) => {
    const index = list.removeItem(item);
    setList(new EmployeeList([...list.employees]));
    return index;
  };

  const addItem = (item: EmployeeListItem, index = 0) => {
    list.addItem(item, index);
    setList(new EmployeeList([...list.employees]));
  };

  return {
    list,
    removeItem,
    addItem,
    updateList: setList,
  };
};
