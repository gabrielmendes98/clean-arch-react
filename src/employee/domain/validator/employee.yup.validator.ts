import { Validator, yup } from 'shared/domain/validator';
import { Employee } from '../entities/employee.entity';

export const employeeYupValidations = {
  name: yup.string().max(100).required().label('Nome'),
  salary: yup.number().positive().required().label('Salário'),
};

export class EmployeeYupValidator implements Validator<Employee> {
  validate(entity: Employee): void {
    try {
      yup
        .object()
        .shape({
          name: employeeYupValidations.name,
          salary: employeeYupValidations.salary,
        })
        .validateSync(
          {
            name: entity.name,
            salary: entity.salary,
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
