import { Validator, yup } from 'shared/domain/validator';
import { Password } from '../value-objects/password.vo';

export const passwordYupValidations = {
  password: yup.string().min(6).required().label('Senha'),
};

export class PasswordYupValidator implements Validator<Password> {
  validate(valueObject: Password): void {
    try {
      yup
        .object()
        .shape({
          password: passwordYupValidations.password,
        })
        .validateSync(
          {
            password: valueObject.value,
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
