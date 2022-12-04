import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { validator } from 'shared/domain/validator';

export type EmployeeProps = {
  name: string;
  salary: number;
  id: UniqueEntityId;
  document: Document;
  email: Email;
};

export class Employee {
  constructor(private readonly props: EmployeeProps) {
    Employee.validate({
      ...props,
      id: props.id.value,
      document: props.document.value,
      email: props.email.value,
    });
    Object.assign(this.props, props);
  }

  static validate(props: {
    name: string;
    salary: number;
    id?: UniqueEntityId['value'];
    document: Document['value'];
    email: Email['value'];
  }): boolean {
    return validator
      .entityValidationSchema(
        {
          name: Employee.validateName,
          salary: Employee.validateSalary,
          id: UniqueEntityId.validate,
          document: Document.validate,
          email: Email.validate,
        },
        ['id'],
      )
      .validate(props);
  }

  static validateSalary(value: number): boolean {
    return validator
      .number()
      .positive()
      .required()
      .validateAttribute(value, 'Salário');
  }

  static validateName(value: string) {
    return validator
      .string()
      .max(100)
      .required()
      .validateAttribute(value, 'Nome');
  }

  get id() {
    return this.props.id.value;
  }

  get document() {
    return this.props.document.value;
  }

  get email() {
    return this.props.email.value;
  }

  get name() {
    return this.props.name;
  }

  get salary() {
    return this.props.salary;
  }

  toJSON() {
    return {
      name: this.name,
      salary: this.salary,
      id: this.id,
      document: this.document,
      email: this.email,
    };
  }
}
