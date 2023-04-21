import { Validator, yup } from 'shared/domain/validator';
import { Document } from 'shared/domain/value-objects/document.vo';
import { validateCnpj } from 'shared/domain/value-objects/utils/cnpj';
import { validateCpf } from 'shared/domain/value-objects/utils/cpf';

export const documentYupValidations = {
  document: yup
    .string()
    .test(
      'test-document',
      'Documento deve ser um CPF ou CNPJ valido',
      value => {
        const isValid =
          validateCpf(String(value)) || validateCnpj(String(value));
        return isValid;
      },
    ),
};

export class DocumentYupValidator implements Validator<Document> {
  validate(valueObject: Document): void {
    try {
      yup
        .object()
        .shape({
          document: documentYupValidations.document,
        })
        .validateSync(
          {
            document: valueObject.value,
          },
          {
            abortEarly: false,
            strict: true,
          },
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.inner.forEach(error => {
        valueObject.notification.addError(String(error.path), error.message);
      });
    }
  }
}
