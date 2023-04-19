import { Validator } from 'shared/domain/validator';
import { Employee } from '../entities/employee.entity';
import { EmployeeYupValidator } from '../validator/employee.yup.validator';

export class EmployeeValidatorFactory {
  public static create(): Validator<Employee> {
    return new EmployeeYupValidator();
  }
}
