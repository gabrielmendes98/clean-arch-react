import { Validator } from 'shared/domain/validator';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';
import { UniqueEntityIdYupValidator } from '../validator/value-object-validators/unique-entity-id.yup.validator';

export class UniqueEntityIdValidatorFactory {
  public static create(): Validator<UniqueEntityId> {
    return new UniqueEntityIdYupValidator();
  }
}
