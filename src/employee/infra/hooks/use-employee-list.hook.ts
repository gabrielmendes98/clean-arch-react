import { useState } from 'react';
import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeListService } from 'employee/domain/interfaces/employee-list.interface';

export const useEmployeeList = (): EmployeeListService => {
  const [list, setList] = useState(new EmployeeList());

  return {
    list,
    updateList: setList,
  };
};
