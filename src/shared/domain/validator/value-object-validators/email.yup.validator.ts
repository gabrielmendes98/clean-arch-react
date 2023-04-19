import { Validator, yup } from 'shared/domain/validator';
import { Email } from 'shared/domain/value-objects/email.vo';

export const emailYupValidations = {
  email: yup.string().email().required().label('Email'),
};

export class EmailYupValidator implements Validator<Email> {
  validate(valueObject: Email): void {
    try {
      yup
        .object()
        .shape({
          email: emailYupValidations.email,
        })
        .validateSync(
          {
            email: valueObject.value,
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
