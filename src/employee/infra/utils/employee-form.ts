import { Input } from 'employee/application/use-cases/register-employee.use-case';

export type EmployeeFormFields = {
  name: string;
  email: string;
  document: string;
  salary: string;
};

export class EmployeeForm {
  name: string;
  email: string;
  document: string;
  salary: string;

  constructor(
    props: EmployeeFormFields = {
      name: '',
      email: '',
      document: '',
      salary: '',
    },
  ) {
    this.name = props.name;
    this.email = props.email;
    this.document = props.document;
    this.salary = props.salary;
  }

  static parseFormToInput(formFields: EmployeeFormFields): Input {
    return {
      name: formFields.name,
      email: formFields.email,
      document: formFields.document,
      salary: Number(formFields.salary),
    };
  }

  toJSON(): EmployeeFormFields {
    return {
      name: this.name,
      email: this.email,
      document: this.document,
      salary: this.salary,
    };
  }
}
