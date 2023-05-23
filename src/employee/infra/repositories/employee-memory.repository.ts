import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';

export class EmployeeMemoryRepository implements EmployeeRepository {
  async delete(): Promise<void> {
    return;
  }

  async get(): Promise<Employee> {
    return EmployeeFactory.create({
      email: 'gabriel@gmail.com',
      id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
      name: 'Gabriel Santiago',
      salary: 25000,
      document: '98536970090',
    });
  }

  async list(): Promise<EmployeeList> {
    const employees = [
      {
        email: 'gabriel@gmail.com',
        id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
        name: 'Gabriel Santiago',
        salary: 25000,
        document: '98536970090',
      },
      {
        email: 'joaodasilva@gmail.com',
        id: '11cbc2c2-32c2-42c5-ba5e-c21ca92a3047',
        name: 'João da Silva',
        salary: 20000,
        document: '75986850025',
      },
    ];
    const employeeList = new EmployeeList(employees);
    return employeeList;
  }

  async create(employee: Employee): Promise<void> {
    if (employee.email === 'tqi_gmsouza@uolinc.com') {
      return Promise.reject({
        message: 'Funcionário já está cadastrado no sistema',
      });
    }

    return;
  }

  async update(): Promise<void> {
    return;
  }
}
