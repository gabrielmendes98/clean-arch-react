import { USER_STORAGE_KEY } from 'authentication/domain/constants/user-storage-key';
import { UserFactory } from 'authentication/domain/factories/user.factory';
import {
  PersistedUser,
  UserStorage,
} from 'authentication/domain/interfaces/user-storage.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class RetrivePersistedUserUseCase implements UseCase<Input, Output> {
  constructor(
    private persistor: StoragePersistor<PersistedUser>,
    private userService: UserStorage,
  ) {}

  execute(): Output {
    const persistedUser = this.persistor.get(USER_STORAGE_KEY);
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
