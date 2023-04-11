import { EmployeeFactory } from './employee.factory';

describe('EmployeeFactory', () => {
  it('should create employee', () => {
    const employeeProps = {
      document: '03542157015',
      email: 'someemail@gmail.com',
      name: 'some name',
      salary: 123123,
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
    };
    const employee = EmployeeFactory.create(employeeProps);
    expect(employee.id).toBe(employeeProps.id);
    expect(employee.name).toBe(employeeProps.name);
    expect(employee.document).toBe(employeeProps.document);
    expect(employee.email).toBe(employeeProps.email);
    expect(employee.salary).toBe(employeeProps.salary);
  });
});
