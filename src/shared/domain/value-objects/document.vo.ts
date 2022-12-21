import { InvalidDocumentError } from '../errors/invalid-document.error';
import { ValueObject } from './value-object';
import { validateCnpj } from './utils/cnpj';
import { validateCpf } from './utils/cpf';

export class Document extends ValueObject<string> {
  constructor(document: string) {
    super(document);
    Document.validate(document);
  }

  static validate(document: string) {
    const isValid =
      Document.isValidCpf(document) || Document.isValidCnpj(document);
    if (!isValid) {
      throw new InvalidDocumentError();
    }
    return true;
  }

  private static isValidCpf(cpf: string) {
    return validateCpf(cpf);
  }

  private static isValidCnpj(cnpj: string) {
    return validateCnpj(cnpj);
  }
}
