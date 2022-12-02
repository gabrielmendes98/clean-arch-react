import { EmployeeList } from 'employee/domain/entities/employee-list.entity';

export interface EmployeeListStorage {
  list: EmployeeList;
  updateList(list: EmployeeList): void;
}
