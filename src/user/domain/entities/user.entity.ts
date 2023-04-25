import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import Entity from 'shared/domain/entity/entity.abstract';
import { UserValidatorFactory } from '../factories/user.validator.factory';

export class User extends Entity {
  private _id: UniqueEntityId;
  private _email: Email;
  private _name: string;
  private _token: string;

  constructor(id: UniqueEntityId, email: Email, token: string, name: string) {
    super();
    this._id = id;
    this._email = email;
    this._token = token;
    this._name = name;
    this.validate();
  }

  get id() {
    return this._id.value;
  }

  get email() {
    return this._email.value;
  }

  get token() {
    return this._token;
  }

  get name() {
    return this._name;
  }

  validate(): void {
    UserValidatorFactory.create().validate(this);
  }

  isValid() {
    return (
      !this.notification.hasErrors() &&
      this._email.isValid() &&
      this._id.isValid()
    );
  }

  get errors() {
    return this.isValid()
      ? null
      : {
          ...this.notification.errors,
          ...this._email.errors,
          ...this._id.errors,
        };
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id,
      email: this.email,
      token: this.token,
    };
  }
}
