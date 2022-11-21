import { Entity } from 'shared/domain/entity/entity';
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

export class Employee extends Entity<EmployeeProps> {
  constructor(public readonly props: EmployeeProps) {
    super(props);
    Employee.validate(props);
    Object.assign(this.props, props);
  }

  static validate(props: EmployeeProps): boolean {
    return validator
      .object({
        name: Employee.nameValidation(),
        salary: Employee.salaryValidation(),
      })
      .validateEntity(props);
  }

  static salaryValidation() {
    return validator.number().positive().required().label('Salário');
  }

  static nameValidation() {
    return validator.string().max(100).required().label('Nome');
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
