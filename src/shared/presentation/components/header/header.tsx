import style from './header.module.scss';

export const Header = () => (
  <header className={style.header}>
    <nav>
      <ul>
        <li>Home</li>
        <li>Cadastrar Funcionario</li>
        <li>Lista de Funcionarios</li>
      </ul>
    </nav>
  </header>
);
