import {
  EmployeeList as EmployeeListEntity,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';

export interface EmployeeListStorage {
  list: EmployeeListEntity;
  addItem(item: EmployeeListItem, index: number): void;
  removeItem(item: EmployeeListItem): number;
  updateList(list: EmployeeListEntity): void;
}
