import { useState, createContext, useCallback, useEffect } from 'react';
import { User } from 'user/domain/entities/user.entity';
import {
  UserStorageProps,
  UserStorage,
} from 'user/domain/interfaces/user-storage.interface';
import { RetrivePersistedUserUseCase } from 'user/use-cases/retrive-persisted-user.use-case';
import { USER_STORAGE_KEY } from 'user/domain/constants/user-storage-key';
import { authConfig } from '../config/config';

export const UserContext = createContext<UserStorage | null>(null);

export const UserProvider = ({ children, persistor }: UserStorageProps) => {
  const [user, setUser] = useState<User | null | undefined>();

  const updateUser = useCallback((user: User | null) => {
    setUser(user);
    persistor.set(USER_STORAGE_KEY, user?.toJSON());
  }, []);

  const removeUser = () => {
    setUser(null);
    persistor.delete(USER_STORAGE_KEY);
  };

  useEffect(() => {
    authConfig.persistor = persistor;
  }, []);

  useEffect(() => {
    const retrivePersistedUserUseCase = new RetrivePersistedUserUseCase(
      persistor,
      {
        user,
        updateUser,
        removeUser,
      },
    );
    retrivePersistedUserUseCase.execute();
  }, []);

  const value = {
    user,
    updateUser,
    removeUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
