import { memo } from 'react';
import { Link } from 'react-router-dom';
import { pages } from 'shared/domain/config/pages';
import styles from './header.module.scss';

export const HeaderComponent = () => (
  <header className={styles.header}>
    <nav>
      <ul>
        <li>
          <Link to={pages.home}>Home</Link>
        </li>
        <li>
          <Link to={pages.login}>Entrar</Link>
        </li>
        <li>
          <Link to={pages.signUp}>Registrar-se</Link>
        </li>
        <li>
          <Link to={pages.registerEmployees}>Cadastrar Funcionário</Link>
        </li>
        <li>
          <Link to={pages.listEmployees}>Lista de Funcionários</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export const Header = memo(HeaderComponent);
