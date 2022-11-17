import { Entity } from 'shared/domain/entity';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id';
import { Document } from 'shared/domain/value-objects/document';
import { Email } from 'shared/domain/value-objects/email';
import { validator } from 'shared/domain/validator';
import { ValidationError } from 'shared/domain/errors/validation-error';

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
    console.log(props);
    this.props.id = props.id;
    this.props.document = props.document;
    this.props.email = props.email;
    this.name = props.name;
    this.salary = props.salary;
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

  set name(value: string) {
    const error = validator.string().max(5).validateSync(value);
    if (error) {
      throw new ValidationError();
    }
    this.props.name = value;
  }

  get salary() {
    return this.props.salary;
  }

  set salary(value: number) {
    try {
      const schema = validator.object().shape({
        salary: validator.number().positive(),
      });
      schema.validateSync({ salary: value });

      this.props.salary = value;
    } catch (error: any) {
      console.log(error.errors);
      // throw new InvalidAttributeError(error.errors[0]);
    }
  }
}
