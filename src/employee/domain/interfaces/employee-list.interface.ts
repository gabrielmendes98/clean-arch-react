import { EmployeeList as EmployeeListEntity } from 'employee/domain/entities/employee-list.entity';

export interface EmployeeListService {
  list: EmployeeListEntity;
  updateList(list: EmployeeListEntity): void;
}
