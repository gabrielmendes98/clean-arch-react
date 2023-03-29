import { User } from 'authentication/domain/entities/user.entity';
import {
  PersistedUser,
  UserStorageService,
} from 'authentication/domain/interfaces/user-storage.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';

export class RetrivePersistedUserUseCase implements UseCase<Input, Output> {
  constructor(
    private persistor: StoragePersistor<PersistedUser>,
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
