import { useState, createContext, useCallback, useEffect } from 'react';
import { User } from 'authentication/domain/entities/user.entity';
import {
  UserStorageProps,
  UserStorage,
} from 'authentication/domain/interfaces/user-storage.interface';
import { RetrivePersistedUserUseCase } from 'authentication/use-cases/retrive-persisted-user.use-case';

export const UserContext = createContext<UserStorage | null>(null);

export const UserProvider = ({ children, persistor }: UserStorageProps) => {
  const [user, setUser] = useState<User | null | undefined>();

  const updateUser = useCallback((user: User | null) => {
    setUser(user);
    persistor.set('user', user?.toJSON());
  }, []);

  const removeUser = () => {
    setUser(null);
    persistor.delete('user');
  };

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
