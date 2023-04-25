import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { NotificationError } from 'shared/domain/notification/notification.error';
import { Employee } from '../employee.entity';

const fakeEmployee = {
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: 123123,
};

describe('Employee Entity', () => {
  it('should validate employee correctly', () => {
    const employee = new Employee(
      '',
      0,
      new Document(fakeEmployee.document),
      new Email(fakeEmployee.email),
      new UniqueEntityId(fakeEmployee.id),
    );
    expect(employee.isValid()).toBeFalsy();
    expect(employee.errors).toStrictEqual({
      name: ['Nome é obrigatório'],
      salary: ['Salário deve ser um número positivo'],
    });
    expect(employee.notification.hasErrors()).toBeTruthy();
    expect(employee.notification.errors).toStrictEqual({
      name: ['Nome é obrigatório'],
      salary: ['Salário deve ser um número positivo'],
    });
  });

  it('should be able to access all properties', () => {
    const employee = new Employee(
      fakeEmployee.name,
      fakeEmployee.salary,
      new Document(fakeEmployee.document),
      new Email(fakeEmployee.email),
      new UniqueEntityId(fakeEmployee.id),
    );
    expect(employee.id).toEqual(fakeEmployee.id);
    expect(employee.name).toEqual(fakeEmployee.name);
    expect(employee.document).toEqual(fakeEmployee.document);
    expect(employee.email).toEqual(fakeEmployee.email);
    expect(employee.salary).toEqual(fakeEmployee.salary);
  });

  it('should be able to parse entity to json', () => {
    const employee = new Employee(
      fakeEmployee.name,
      fakeEmployee.salary,
      new Document(fakeEmployee.document),
      new Email(fakeEmployee.email),
      new UniqueEntityId(fakeEmployee.id),
    );
    expect(employee.toJSON()).toStrictEqual(fakeEmployee);
  });
});
