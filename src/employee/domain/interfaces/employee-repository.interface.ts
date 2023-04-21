import { EmployeeList } from '../entities/employee-list.entity';
import { Employee } from '../entities/employee.entity';

export interface EmployeeRepository {
  delete(employee: Employee): Promise<void>;
  get(id: string): Promise<Employee>;
  list(): Promise<EmployeeList>;
  create(employee: Employee): Promise<void>;
  update(employee: Employee): Promise<void>;
}
