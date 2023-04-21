import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { User } from '../entities/user.entity';

interface UserFactoryProps {
  id: string;
  email: string;
  token: string;
  name: string;
}

export class UserFactory {
  static create(user: UserFactoryProps): User {
    return new User(
      new UniqueEntityId(user.id),
      new Email(user.email),
      user.token,
      user.name,
    );
  }
}
