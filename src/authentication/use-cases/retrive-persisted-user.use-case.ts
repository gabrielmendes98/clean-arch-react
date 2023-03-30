import { UserFactory } from 'authentication/domain/factories/user.factory';
import {
  PersistedUser,
  UserStorageService,
} from 'authentication/domain/interfaces/user-storage.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class RetrivePersistedUserUseCase implements UseCase<Input, Output> {
  constructor(
    private persistor: StoragePersistor<PersistedUser>,
    private userService: UserStorageService,
  ) {}

  execute(): Output {
    const persistedUser = this.persistor.get('user');
    if (persistedUser) {
      this.userService.updateUser(
        UserFactory.create({
          id: persistedUser.id,
          email: persistedUser.email,
          token: persistedUser.token,
          name: persistedUser.name,
        }),
      );
    } else {
      this.userService.updateUser(null);
    }
  }
}

export type Input = void;

export type Output = void;
