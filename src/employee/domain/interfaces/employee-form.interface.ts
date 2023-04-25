import { Employee } from 'employee/domain/entities/employee.entity';
import { Errors } from 'shared/domain/interfaces/errors.interface';

export interface EmployeeFormFields {
  name: string;
  email: string;
  document: string;
  salary: string;
}

export interface EmployeeFormService {
  initialValues: EmployeeFormFields;
  parseValuesToInput(formFields: EmployeeFormFields): {
    name: string;
    email: string;
    document: string;
    salary: number;
  };
  parseEntityToValues(employee: Employee): EmployeeFormFields;
  validator: (values: EmployeeFormFields) => Errors | null;
}
