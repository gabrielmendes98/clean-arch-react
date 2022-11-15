import { Outlet } from 'react-router-dom';
import { Footer } from '../../footer';
import { Header } from '../../header';
import style from './main.module.scss';

export const MainLayout = () => (
  <div className={style.container}>
    <Header />
    <main className={style.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
