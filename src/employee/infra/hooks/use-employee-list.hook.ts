import { useState } from 'react';
import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';

export const useEmployeeListStorage = (): EmployeeListStorage => {
  const [list, setList] = useState(new EmployeeList());

  return {
    list,
    updateList: setList,
  };
};
