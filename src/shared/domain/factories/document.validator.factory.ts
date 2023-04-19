import { Validator } from 'shared/domain/validator';
import { Document } from '../value-objects/document.vo';
import { DocumentYupValidator } from '../validator/value-object-validators/document.yup.validator';

export class DocumentValidatorFactory {
  public static create(): Validator<Document> {
    return new DocumentYupValidator();
  }
}
