import { Email } from '../value-objects/email.vo';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';

export class User {
  private _id: UniqueEntityId;
  private _email: Email;
  private token: string;

  constructor(id: UniqueEntityId, email: Email, token: string) {
    this._id = id;
    this._email = email;
    this.token = token;
  }

  get id() {
    return this._id.value;
  }

  get email() {
    return this._email.value;
  }
}
