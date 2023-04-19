import { UniqueEntityIdValidatorFactory } from '../factories/unique-entity-id.validator.factory';
import { Notification } from '../notification/notification';
import { NotificationError } from '../notification/notification.error';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  public notification: Notification;

  constructor(id: string) {
    super(id);
    this.notification = new Notification();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    UniqueEntityIdValidatorFactory.create().validate(this);
  }
}
