import { UserStorageService } from 'authentication/domain/interfaces/user-storage.interface';
import { useUserStorage } from 'authentication/infra/hooks/use-user-storage.hook';
import { Home } from '../containers/home.container';

export const MakeHome = () => {
  const userStorage: UserStorageService = useUserStorage();

  return <Home userStorage={userStorage} />;
};
