import {
  EntityValidationError,
  ValidationError,
} from 'shared/domain/errors/validation.error';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Employee } from '../employee.entity';

const fakeEmployee = {
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: 123123,
};

describe('Employee Entity', () => {
  it('should validate on create', () => {
    const validate = jest.spyOn(Employee, 'validate');
    new Employee({
      id: new UniqueEntityId(fakeEmployee.id),
      document: new Document(fakeEmployee.document),
      email: new Email(fakeEmployee.email),
      name: fakeEmployee.name,
      salary: fakeEmployee.salary,
    });
    expect(validate).toHaveBeenCalledWith(fakeEmployee);
  });

  test('Employee validation should throw EntityValidationError', () => {
    expect.assertions(2);
    try {
      Employee.validate({
        name: '',
        document: '',
        email: '',
        salary: '',
        id: '',
      } as any);
    } catch (e: any) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect(e.errors).toStrictEqual({
        name: ['Nome é obrigatório'],
        salary: [
          'Salário deve ser do tipo `number`, mas o valor final é: `""`',
        ],
        id: ['ID deve ser um UUID valido'],
        document: ['Documento deve ser um CPF ou CNPJ valido'],
        email: ['Email inválido'],
      });
    }
  });

  it('should be able to access all properties', () => {
    const employee = new Employee({
      id: new UniqueEntityId(fakeEmployee.id),
      document: new Document(fakeEmployee.document),
      email: new Email(fakeEmployee.email),
      name: fakeEmployee.name,
      salary: fakeEmployee.salary,
    });
    expect(employee.id).toEqual(fakeEmployee.id);
    expect(employee.name).toEqual(fakeEmployee.name);
    expect(employee.document).toEqual(fakeEmployee.document);
    expect(employee.email).toEqual(fakeEmployee.email);
    expect(employee.salary).toEqual(fakeEmployee.salary);
  });

  it('should be able to parse entity to json', () => {
    const employee = new Employee({
      id: new UniqueEntityId(fakeEmployee.id),
      document: new Document(fakeEmployee.document),
      email: new Email(fakeEmployee.email),
      name: fakeEmployee.name,
      salary: fakeEmployee.salary,
    });
    expect(employee.toJSON()).toStrictEqual(fakeEmployee);
  });

  describe('validateSalary ', () => {
    it('should pass when valid', () => {
      expect(() => Employee.validateSalary(123123)).not.toThrowError();
    });

    const arrange = [
      {
        input: '123123',
        error:
          'Salário deve ser do tipo `number`, mas o valor final é: `"123123"`',
      },
      {
        input: -1,
        error: 'Salário deve ser um número positivo',
      },
      {
        input: undefined,
        error: 'Salário é obrigatório',
      },
    ];

    test.each(arrange)('when $input', data => {
      try {
        Employee.validateSalary(data.input as any);
        fail('it should have failed');
      } catch (e: any) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.errors).toStrictEqual([data.error]);
      }
    });
  });

  describe('validateName ', () => {
    it('should pass when valid', () => {
      expect(() => Employee.validateName('valid name')).not.toThrowError();
    });

    const arrange = [
      {
        input: 123,
        error: 'Nome deve ser do tipo `string`, mas o valor final é: `123`',
      },
      {
        input: 'a'.repeat(101),
        error: 'Nome deve ter no máximo 100 caracteres',
      },
      {
        input: undefined,
        error: 'Nome é obrigatório',
      },
    ];

    test.each(arrange)('when $input', data => {
      expect.assertions(2);
      try {
        Employee.validateName(data.input as any);
      } catch (e: any) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.errors).toStrictEqual([data.error]);
      }
    });
  });
});
