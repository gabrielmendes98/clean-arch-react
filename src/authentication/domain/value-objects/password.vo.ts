import { Notification } from 'shared/domain/notification/notification';
import { NotificationError } from 'shared/domain/notification/notification.error';
import { ValueObject } from '../../../shared/domain/value-objects/value-object';
import { PasswordValidatorFactory } from '../factories/password.validator.factory';

export class Password extends ValueObject<string> {
  public notification: Notification;

  constructor(password: string) {
    super(password);
    this.notification = new Notification();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    PasswordValidatorFactory.create().validate(this);
  }
}
