import { UserStorageService } from 'shared/application/user-storage.port';
import styles from './home.module.scss';

type Props = {
  userStorage: UserStorageService;
};

export const Home = ({ userStorage }: Props) => {
  const { user } = userStorage;

  return (
    <section className={styles.box}>
      <p>
        welcome to clean arch react application
        {user && <span id="welcome-user-name">, {user.name}</span>}
      </p>
    </section>
  );
};
