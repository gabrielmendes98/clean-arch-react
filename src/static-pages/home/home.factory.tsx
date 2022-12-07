import { UserStorageService } from 'shared/application/user-storage.port';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { Home } from './components/home.view';

export const MakeHome = () => {
  const userStorage: UserStorageService = useUserStorage();

  return <Home userStorage={userStorage} />;
};
