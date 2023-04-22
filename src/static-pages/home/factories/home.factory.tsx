import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import { useUserStorage } from 'user/infra/hooks/use-user-storage.hook';
import { Home } from '../containers/home.container';

export const MakeHomeContainer = () => {
  const userStorage: UserStorage = useUserStorage();

  return <Home userStorage={userStorage} />;
};
