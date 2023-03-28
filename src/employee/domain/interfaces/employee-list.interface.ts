import { EmployeeList as EmployeeListEntity } from 'employee/domain/entities/employee-list.entity';

export interface EmployeeListStorage {
  list: EmployeeListEntity;
  updateList(list: EmployeeListEntity): void;
}
