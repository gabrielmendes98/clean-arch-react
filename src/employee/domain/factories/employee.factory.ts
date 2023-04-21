import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Employee } from '../entities/employee.entity';

interface EmployeeFactoryProps {
  name: string;
  salary: number;
  document: string;
  email: string;
  id?: string;
}

export class EmployeeFactory {
  static create(props: EmployeeFactoryProps): Employee {
    return new Employee(
      props.name,
      props.salary,
      new Document(props.document),
      new Email(props.email),
      props.id ? new UniqueEntityId(props.id) : undefined,
    );
  }
}
