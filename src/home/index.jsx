import { HomeContainer } from './infra/container';
import { Employee } from 'employee/form/domain/entities/employee';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id';
import { Document } from 'shared/domain/value-objects/document';
import { Email } from 'shared/domain/value-objects/email';

const employee = new Employee({
  name: 'gabriel',
  salary: 5,
  id: new UniqueEntityId('259d7634-2c89-42c5-80a3-ef8f867314c9'),
  document: new Document('08567988608'),
  email: new Email('gabriel@gmail.com'),
});

console.log(employee);

export const makeHome = () => {
  return <HomeContainer />;
};
