import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Notification } from 'shared/domain/notification/notification';
import { NotificationError } from 'shared/domain/notification/notification.error';
import { EmployeeValidatorFactory } from '../factories/employee.validator.factory';

export class Employee {
  public notification: Notification;
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
    this.notification = new Notification();
    this._name = name;
    this._salary = salary;
    this._document = document;
    this._email = email;
    this._id = id;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
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
