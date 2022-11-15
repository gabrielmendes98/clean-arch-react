import { Footer } from '../../footer';
import { Header } from '../../header';
import style from './main.module.scss';

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => (
  <div className={style.container}>
    <Header />
    <main className={style.main}>{children}</main>
    <Footer />
  </div>
);
