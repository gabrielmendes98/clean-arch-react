import { Employee } from 'employee/domain/entities/employee.entity';

type FormErrors = Record<string, string[]>;

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
}
