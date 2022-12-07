import { Email } from '../value-objects/email.vo';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';

export class User {
  private _id: UniqueEntityId;
  private _email: Email;
  private _token: string;
  private _name: string;

  constructor(id: UniqueEntityId, email: Email, token: string, name: string) {
    this._id = id;
    this._email = email;
    this._token = token;
    this._name = name;
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

  toJSON() {
    return {
      name: this.name,
      id: this.id,
      email: this.email,
      token: this.token,
    };
  }
}
