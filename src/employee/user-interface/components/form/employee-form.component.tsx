import { Button } from 'shared/user-interface/components/button/button.component';
import styles from './employee-form.module.scss';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({ onSubmit }: Props) => (
  <form className={styles.container} onSubmit={onSubmit}>
    <label htmlFor="name">Nome:</label>
    <input type="text" id="name" name="name" />

    <label htmlFor="salary">Salario:</label>
    <input type="text" id="salary" name="salary" />

    <label htmlFor="document">CPF/CNPJ:</label>
    <input type="text" id="document" name="document" />

    <label htmlFor="email">Email:</label>
    <input type="text" id="email" name="email" />

    <Button type="submit">Enviar</Button>
  </form>
);
