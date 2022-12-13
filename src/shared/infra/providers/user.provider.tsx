import {
  useState,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import { StoragePersistor } from 'shared/application/storage-persistor.port';
import { RetrivePersistedUserUseCase } from 'shared/application/use-cases/retrive-persisted-user.use-case';
import { UserStorageService } from 'shared/application/user-storage.port';
import { User } from 'shared/domain/entities/user.entity';

export const UserContext = createContext<UserStorageService | null>(null);

export type Props = {
  persistor: StoragePersistor;
} & PropsWithChildren;

export const UserProvider = ({ children, persistor }: Props) => {
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
