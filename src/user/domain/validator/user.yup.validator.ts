import { Validator, yup } from 'shared/domain/validator';
import { User } from '../entities/user.entity';

export const userYupValidations = {
  name: yup.string().trim().min(3).required().label('Nome'),
};

export class UserYupValidator implements Validator<User> {
  validate(entity: User): void {
    try {
      yup
        .object()
        .shape({
          name: userYupValidations.name,
        })
        .validateSync(
          {
            name: entity.name,
          },
          {
            abortEarly: false,
            strict: true,
          },
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.inner.forEach(error => {
        entity.notification.addError(String(error.path), error.message);
      });
    }
  }
}
