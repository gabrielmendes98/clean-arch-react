import { useState } from 'react';
import { EmployeeList as EmployeeListPort } from 'employee/application/ports/employee-list.port';
import { EmployeeList as EmployeeListEntity } from 'employee/domain/entities/employee-list.entity';

export const useEmployeeList = (): EmployeeListPort => {
  const [list, setList] = useState(new EmployeeListEntity());

  return {
    list,
    updateList: setList,
  };
};
