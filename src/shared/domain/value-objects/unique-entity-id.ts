import { validate as uuidValidate } from 'uuid';
import { InvalidUuidError } from '../errors/invalid-uuid';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(id: string) {
    super(id);
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
