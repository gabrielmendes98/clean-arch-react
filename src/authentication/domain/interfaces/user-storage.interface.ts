import { PropsWithChildren } from 'react';
import { User } from 'authentication/domain/entities/user.entity';
import { StoragePersistor } from '../../../shared/domain/interfaces/storage-persistor.interface';

export interface UserStorage {
  user: User | null | undefined;
  updateUser(user: User | null): void;
  removeUser(): void;
}

export interface PersistedUser {
  name: string;
  id: string;
  email: string;
  token: string;
}

export interface UserStorageProps extends PropsWithChildren {
  persistor: StoragePersistor;
}
