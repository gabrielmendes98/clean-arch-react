import { useState, PropsWithChildren, createContext, useCallback } from 'react';
import { UserStorageService } from 'shared/application/user-storage.port';
import { User } from 'shared/domain/entities/user.entity';
import { makeStoragePersistor } from 'shared/infra/factories/storage-persistor.factory';

export const UserContext = createContext<UserStorageService | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const persistor = makeStoragePersistor<User>();
  const [user, setUser] = useState<User | null>(null);

  const updateUser = useCallback((user: User) => {
    setUser(user);
    persistor.set('user', user);
  }, []);

  const removeUser = () => {
    setUser(null);
    persistor.delete('user');
  };

  const value = {
    user,
    updateUser,
    removeUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
