import { Notification } from 'shared/domain/notification/notification';
import { NotificationError } from 'shared/domain/notification/notification.error';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { UserValidatorFactory } from '../factories/user.validator.factory';

export class User {
  public notification: Notification;
  private _id: UniqueEntityId;
  private _email: Email;
  private _name: string;
  private _token: string;

  constructor(id: UniqueEntityId, email: Email, token: string, name: string) {
    this.notification = new Notification();
    this._id = id;
    this._email = email;
    this._token = token;
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
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

  toJSON() {
    return {
      name: this.name,
      id: this.id,
      email: this.email,
      token: this.token,
    };
  }
}
