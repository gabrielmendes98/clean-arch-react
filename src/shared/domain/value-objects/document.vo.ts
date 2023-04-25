import { DocumentValidatorFactory } from '../factories/document.validator.factory';
import { ValueObject } from './value-object';

export class Document extends ValueObject<string> {
  constructor(document: string) {
    super(document);
    this.validate();
  }

  validate() {
    DocumentValidatorFactory.create().validate(this);
  }
}
