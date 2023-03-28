import { Button } from 'shared/user-interface/components/button/button.component';
import { SlowInput } from 'shared/user-interface/components/input/slow-input.component';
import styles from 'shared/user-interface/styles/global.module.scss';

export const EmployeeForm = () => (
  <div className={styles.formBox}>
    <SlowInput label="Nome:" name="name" />
    <SlowInput label="Salário:" name="salary" />
    <SlowInput label="CPF/CNPJ:" name="document" />
    <SlowInput label="Email:" name="email" />
    <Button type="submit">Enviar</Button>
  </div>
);
