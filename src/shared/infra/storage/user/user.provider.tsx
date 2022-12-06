import { useState, PropsWithChildren, createContext, Dispatch } from 'react';
import { Email } from 'shared/domain/value-objects/email.vo';

export type User = {
  email: Email;
  name: string;
};

export type UserProviderData = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserProviderData | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
