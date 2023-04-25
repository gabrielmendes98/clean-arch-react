import { Errors } from '../interfaces/errors.interface';
import { Notification } from '../notification/notification';

export abstract class ValueObject<Value = any> {
  private _notification: Notification;
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
    this._notification = new Notification();
  }

  get value(): Value {
    return this._value;
  }

  get notification() {
    return this._notification;
  }

  isValid(): boolean {
    return !this._notification.hasErrors();
  }

  get errors(): Errors | null {
    return this.isValid() ? null : this.notification.errors;
  }

  toString() {
    if (typeof this.value !== 'object' || this.value === null) {
      return String(this.value);
    }

    const valueStr = String(this.value);
    return valueStr === '[object Object]'
      ? JSON.stringify(this.value)
      : valueStr;
  }
}
