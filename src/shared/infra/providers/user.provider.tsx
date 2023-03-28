import { useState, createContext, useCallback, useEffect } from 'react';
import { RetrivePersistedUserUseCase } from 'shared/use-cases/retrive-persisted-user.use-case';
import { User } from 'shared/domain/entities/user.entity';
import {
  UserStorageProps,
  UserStorageService,
} from 'shared/domain/interfaces/user-storage.interface';

export const UserContext = createContext<UserStorageService | null>(null);

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
