import { Errors } from '../interfaces/errors.interface';
import { Notification } from '../notification/notification';

export default abstract class Entity {
  private _notification: Notification;

  constructor() {
    this._notification = new Notification();
  }

  get notification(): Notification {
    return this._notification;
  }

  isValid(): boolean {
    return !this._notification.hasErrors();
  }

  get errors(): Errors | null {
    return this.isValid() ? null : this.notification.errors;
  }
}
