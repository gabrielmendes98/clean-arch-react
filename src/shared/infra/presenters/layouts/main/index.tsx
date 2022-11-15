import { Outlet } from 'react-router-dom';
import { Footer } from '../../footer';
import { Header } from '../../header';
import styles from './styles.module.scss';

export const MainLayout = () => (
  <div className={styles.container}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
