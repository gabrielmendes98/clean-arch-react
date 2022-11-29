import { Outlet } from 'react-router-dom';
import { Footer } from '../../footer/footer.component';
import { Header } from '../../header/header.component';
import styles from './main.module.scss';

export const MainLayout = () => (
  <div className={styles.box}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
