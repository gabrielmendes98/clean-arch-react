import { User } from 'shared/domain/entities/user.entity';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { StoragePersistor } from '../storage-persistor.port';
import { UseCase } from '../use-case';
import { UserStorageService } from '../user-storage.port';

export class RetrivePersistedUserUseCase implements UseCase<Input, Output> {
  constructor(
    private persistor: StoragePersistor,
    private userService: UserStorageService,
  ) {}

  execute(): Output {
    const persistedUser = this.persistor.get('user');
    if (persistedUser) {
      this.userService.updateUser(
        new User(
          new UniqueEntityId(persistedUser.id),
          new Email(persistedUser.email),
          persistedUser.token,
          persistedUser.name,
        ),
      );
    } else {
      this.userService.updateUser(null);
    }
  }
}

export type Input = void;

export type Output = void;
