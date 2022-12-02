import { useState } from 'react';
import { EmployeeListStorage } from 'employee/application/ports/employee-list.storage';
import { EmployeeList } from 'employee/domain/entities/employee-list.entity';

export const useEmployeeList = (): EmployeeListStorage => {
  const [list, setList] = useState(new EmployeeList());

  return {
    list,
    updateList: setList,
  };
};
