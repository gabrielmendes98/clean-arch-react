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
      const user = UserFactory.create({
        id: persistedUser.id,
        email: persistedUser.email,
        token: persistedUser.token,
        name: persistedUser.name,
      });
      if (!user.isValid()) {
        throw new Error('Invalid persisted user');
      }
      this.userService.updateUser(user);
    } else {
      this.userService.updateUser(null);
    }
  }
}

export type RetrivePersistedUserUseCaseInput = void;

export type RetrivePersistedUserUseCaseOutput = void;
