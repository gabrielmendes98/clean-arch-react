import { Input } from '../use-cases/register-employee.use-case';

export interface EmployeeFormFields {
  name: string;
  email: string;
  document: string;
  salary: string;
}

export interface EmployeeFormService {
  initialValues: EmployeeFormFields;
  parseValuesToInput(formFields: EmployeeFormFields): Input;
}
