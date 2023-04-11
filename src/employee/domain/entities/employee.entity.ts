import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { validator } from 'shared/domain/validator';

export class Employee {
  private _name: string;
  private _salary: number;
  private _document: Document;
  private _email: Email;
  private _id?: UniqueEntityId;

  constructor(
    name: string,
    salary: number,
    document: Document,
    email: Email,
    id?: UniqueEntityId,
  ) {
    this._name = name;
    this._salary = salary;
    this._document = document;
    this._email = email;
    this._id = id;

    Employee.validate({
      name,
      salary,
      document: document.value,
      email: email.value,
      id: id?.value,
    });
  }

  static validate(props: {
    name: string;
    salary: number;
    document: Document['value'];
    email: Email['value'];
    id?: UniqueEntityId['value'];
  }): boolean {
    return validator
      .entityValidationSchema(
        {
          name: Employee.validateName,
          salary: Employee.validateSalary,
          document: Document.validate,
          email: Email.validate,
          id: UniqueEntityId.validate,
        },
        ['id'],
      )
      .validate(props);
  }

  static validateSalary(value: number): boolean {
    return validator
      .number()
      .positive()
      .required()
      .validateAttribute(value, 'Salário');
  }

  static validateName(value: string) {
    return validator
      .string()
      .max(100)
      .required()
      .validateAttribute(value, 'Nome');
  }

  get id() {
    return this._id?.value;
  }

  get document() {
    return this._document.value;
  }

  get email() {
    return this._email.value;
  }

  get name() {
    return this._name;
  }

  get salary() {
    return this._salary;
  }

  toJSON() {
    return {
      name: this.name,
      salary: this.salary,
      id: this.id,
      document: this.document,
      email: this.email,
    };
  }
}
