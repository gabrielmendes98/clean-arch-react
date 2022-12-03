import { useState } from 'react';
import { EmployeeListService } from 'employee/application/ports/employee-list.port';
import { EmployeeList } from 'employee/domain/entities/employee-list.entity';

export const useEmployeeList = (): EmployeeListService => {
  const [list, setList] = useState(new EmployeeList());

  return {
    list,
    updateList: setList,
  };
};
