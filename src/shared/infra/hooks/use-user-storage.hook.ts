import { useContext, Context } from 'react';
import { UserStorageService } from 'shared/domain/interfaces/user-storage.interface';
import { UserContext } from '../providers/user.provider';

export const useUserStorage = (): UserStorageService => {
  const context = useContext<UserStorageService>(
    UserContext as unknown as Context<UserStorageService>,
  );
  if (!context) {
    throw new Error('useUserStorage must be used under UserContext');
  }
  return context;
};
