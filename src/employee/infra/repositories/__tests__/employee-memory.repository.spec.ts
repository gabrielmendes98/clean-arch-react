import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeMemoryRepository } from '../employee-memory.repository';

describe('EmployeeMemoryGateway', () => {
  let gateway: EmployeeMemoryRepository;

  beforeEach(() => {
    gateway = new EmployeeMemoryRepository();
  });

  it('should return correct payload when call deleteEmployee method', async () => {
    expect(await gateway.delete()).toBeUndefined();
  });

  it('should return correct payload when call getEmployee method', async () => {
    expect(await gateway.get()).toEqual(
      EmployeeFactory.create({
        email: 'gabriel@gmail.com',
        id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
        name: 'Gabriel Santiago',
        salary: 25000,
        document: '98536970090',
      }),
    );
  });

  it('should return correct payload when call listEmployees method', async () => {
    const employee1 = {
      email: 'gabriel@gmail.com',
      id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
      name: 'Gabriel Santiago',
      salary: 25000,
      document: '98536970090',
    };
    const employee2 = {
      email: 'joaodasilva@gmail.com',
      id: '11cbc2c2-32c2-42c5-ba5e-c21ca92a3047',
      name: 'João da Silva',
      salary: 20000,
      document: '75986850025',
    };
    const employeeList = new EmployeeList([employee1, employee2]);

    expect(await gateway.list()).toStrictEqual(employeeList);
  });

  it('should return correct payload when call createEmployee method', async () => {
    const employee = EmployeeFactory.create({
      email: 'validemail@gmail.com',
      id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
      name: 'Gabriel Santiago',
      salary: 25000,
      document: '98536970090',
    });
    expect(await gateway.create(employee)).toBeUndefined();
  });

  it('should return correct payload when call updateEmployee method', async () => {
    expect(await gateway.update()).toBeUndefined();
  });
});
