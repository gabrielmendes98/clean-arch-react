import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import Entity from 'shared/domain/entity/entity.abstract';
import { Errors } from 'shared/domain/interfaces/errors.interface';
import { EmployeeValidatorFactory } from '../factories/employee.validator.factory';

export class Employee extends Entity {
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
    super();
    this._name = name;
    this._salary = salary;
    this._document = document;
    this._email = email;
    this._id = id;
    this.validate();
  }

  validate(): void {
    EmployeeValidatorFactory.create().validate(this);
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

  isValid() {
    return Boolean(
      !this.notification.hasErrors() &&
        this._document.isValid() &&
        this._email.isValid() &&
        this._id?.isValid(),
    );
  }

  get errors(): Errors | null {
    return this.isValid()
      ? null
      : {
          ...this.notification.errors,
          ...this._document.errors,
          ...this._email.errors,
          ...this._id?.errors,
        };
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
