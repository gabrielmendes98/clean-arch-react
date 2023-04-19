import { EmailValidatorFactory } from '../factories/email.validator.factory';
import { Notification } from '../notification/notification';
import { NotificationError } from '../notification/notification.error';
import { ValueObject } from './value-object';

export class Email extends ValueObject<string> {
  public notification: Notification;

  constructor(email: string) {
    super(email);
    this.notification = new Notification();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    EmailValidatorFactory.create().validate(this);
  }
}
