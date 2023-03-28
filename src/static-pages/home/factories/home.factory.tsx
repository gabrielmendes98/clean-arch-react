import { UserStorageService } from 'shared/domain/interfaces/user-storage.interface';
import { useUserStorage } from 'shared/infra/hooks/use-user-storage.hook';
import { Home } from '../containers/home.container';

export const MakeHome = () => {
  const userStorage: UserStorageService = useUserStorage();

  return <Home userStorage={userStorage} />;
};
