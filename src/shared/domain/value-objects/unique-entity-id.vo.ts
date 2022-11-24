import { validate as uuidValidate } from 'uuid';
import { InvalidUuidError } from '../errors/invalid-uuid.error';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(id: string) {
    super(id);
    UniqueEntityId.validate(id);
  }

  static validate(id: string) {
    const isValid = uuidValidate(id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
    return true;
  }
}
