import { Link } from 'react-router-dom';
import { PAGES } from 'shared/domain/constants/pages';
import styles from './header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <nav>
      <ul>
        <li>
          <Link to={PAGES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={PAGES.REGISTER_EMPLOYEES}>Cadastrar Funcionario</Link>
        </li>
        <li>
          <Link to={PAGES.LIST_EMPLOYEES}>Lista de Funcionarios</Link>
        </li>
      </ul>
    </nav>
  </header>
);
