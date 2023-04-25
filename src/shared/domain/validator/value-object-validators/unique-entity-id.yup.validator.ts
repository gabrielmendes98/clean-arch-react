import { validate as uuidValidate } from 'uuid';
import { Validator, yup } from 'shared/domain/validator';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';

export class UniqueEntityIdYupValidator implements Validator<UniqueEntityId> {
  validate(valueObject: UniqueEntityId): void {
    try {
      yup
        .object()
        .shape({
          id: yup
            .string()
            .required()
            .test(
              'test-unique-entity-id',
              'ID deve ser um UUID válido',
              value => {
                const isValid = uuidValidate(String(value));
                return isValid;
              },
            ),
        })
        .validateSync(
          {
            id: valueObject.value,
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
