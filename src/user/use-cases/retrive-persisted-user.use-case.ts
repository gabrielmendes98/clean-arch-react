import { USER_STORAGE_KEY } from 'user/domain/constants/user-storage-key';
import { UserFactory } from 'user/domain/factories/user.factory';
import {
  PersistedUser,
  UserStorage,
} from 'user/domain/interfaces/user-storage.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { UseCase } from 'shared/use-cases/use-case.interface';

export class RetrivePersistedUserUseCase
  implements
    UseCase<
      RetrivePersistedUserUseCaseInput,
      RetrivePersistedUserUseCaseOutput
    >
{
  constructor(
    private persistor: StoragePersistor<PersistedUser>,
    private userService: UserStorage,
  ) {}

  execute(): RetrivePersistedUserUseCaseOutput {
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

export type RetrivePersistedUserUseCaseInput = void;

export type RetrivePersistedUserUseCaseOutput = void;
