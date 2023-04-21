import { DocumentValidatorFactory } from '../factories/document.validator.factory';
import { Notification } from '../notification/notification';
import { NotificationError } from '../notification/notification.error';
import { ValueObject } from './value-object';

export class Document extends ValueObject<string> {
  public notification: Notification;

  constructor(document: string) {
    super(document);
    this.notification = new Notification();
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    DocumentValidatorFactory.create().validate(this);
  }
}
