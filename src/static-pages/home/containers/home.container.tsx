import { UserStorage } from 'user/domain/interfaces/user-storage.interface';
import styles from './home.module.scss';

type Props = {
  userStorage: UserStorage;
};

export const Home = ({ userStorage }: Props) => {
  const { user } = userStorage;

  function methodDoesNotExist(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <section className={styles.box}>
      <p>
        Bem-vindo(a) à aplicação Clean Arch React
        {user && <span id="welcome-user-name">, {user.name}</span>}
      </p>
      <button onClick={methodDoesNotExist}>Test sentry error</button>
    </section>
  );
};
