import {
  useState,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import {
  PersistedUser,
  UserStorageService,
} from 'shared/application/user-storage.port';
import { User } from 'shared/domain/entities/user.entity';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { makeStoragePersistor } from 'shared/infra/factories/storage-persistor.factory';

export const UserContext = createContext<UserStorageService | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const persistor = makeStoragePersistor<PersistedUser>();
  const [user, setUser] = useState<User | null>(null);

  const updateUser = useCallback((user: User) => {
    setUser(user);
    persistor.set('user', user.toJSON());
  }, []);

  const removeUser = () => {
    setUser(null);
    persistor.delete('user');
  };

  useEffect(() => {
    const persistedUser = persistor.get('user');
    if (persistedUser) {
      setUser(
        new User(
          new UniqueEntityId(persistedUser.id),
          new Email(persistedUser.email),
          persistedUser.token,
          persistedUser.name,
        ),
      );
    }
  }, []);

  const value = {
    user,
    updateUser,
    removeUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
