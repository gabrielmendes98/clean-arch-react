import { useContext, Context } from 'react';
import { UserContext, UserProviderData } from './user.provider';

export const useUserStorage = () => {
  const context = useContext<UserProviderData>(
    UserContext as unknown as Context<UserProviderData>,
  );
  if (!context) {
    throw new Error('useUserStorage must be used under UserContext');
  }
  return context;
};
