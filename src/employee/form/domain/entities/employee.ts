import { Entity } from 'shared/domain/entity';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id';
import { Document } from 'shared/domain/value-objects/document';
import { Email } from 'shared/domain/value-objects/email';
import { ValidationError } from 'shared/domain/errors/validation-error';
import { validator } from 'shared/domain/validator';

export type EmployeeProps = {
  name: string;
  salary: number;
  id: UniqueEntityId;
  document: Document;
  email: Email;
};

export class Employee extends Entity<EmployeeProps> {
  constructor(public readonly props: EmployeeProps) {
    super(props);
    this.validate(props);
    Object.assign(this.props, props);
  }

  private validate(props: EmployeeProps) {
    Employee.validateName(props.name);
    Employee.validateSalary(props.salary);
  }

  static validateSalary(value: EmployeeProps['salary']) {
    try {
      validator
        .number()
        .positive()
        .required()
        .label('Salário')
        .validateSync(value);
      return true;
    } catch (error: any) {
      throw new ValidationError(error.errors);
    }
  }

  static validateName(value: Employee['name']) {
    try {
      validator
        .string()
        .max(100)
        .required()
        .label('Nome')
        .validateSync(value, { strict: true });
      return true;
    } catch (error: any) {
      throw new ValidationError(error.errors);
    }
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
}
