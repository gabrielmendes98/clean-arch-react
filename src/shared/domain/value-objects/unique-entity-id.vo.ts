import { UniqueEntityIdValidatorFactory } from '../factories/unique-entity-id.validator.factory';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(id: string) {
    super(id);
    this.validate();
  }

  validate() {
    UniqueEntityIdValidatorFactory.create().validate(this);
  }
}
