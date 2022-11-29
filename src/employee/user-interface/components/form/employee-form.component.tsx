import { Button } from 'shared/user-interface/components/button/button.component';
import { SlowInput } from 'shared/user-interface/components/input/slow-input.component';
import styles from './employee-form.module.scss';

export const Form = () => (
  <div className={styles.box}>
    <SlowInput label="Nome:" name="name" />
    <SlowInput label="Salario:" name="salary" />
    <SlowInput label="CPF/CNPJ:" name="document" />
    <SlowInput label="Email:" name="email" />
    <Button type="submit">Enviar</Button>
  </div>
);
