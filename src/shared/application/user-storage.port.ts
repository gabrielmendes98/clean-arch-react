import { PropsWithChildren } from 'react';
import { User } from 'shared/domain/entities/user.entity';
import { StoragePersistor } from './storage-persistor.port';

export interface UserStorageService {
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
