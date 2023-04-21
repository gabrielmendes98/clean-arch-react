import { useContext, Context } from 'react';
import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';
import { UserContext } from '../providers/user.provider';

export const useUserStorage = (): UserStorage => {
  const context = useContext<UserStorage>(
    UserContext as unknown as Context<UserStorage>,
  );
  if (!context) {
    throw new Error('useUserStorage must be used under UserContext');
  }
  return context;
};
