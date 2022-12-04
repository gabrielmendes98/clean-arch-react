import { Button } from 'shared/user-interface/components/button/button.component';
import { SlowInput } from 'shared/user-interface/components/input/slow-input.component';
import styles from 'shared/infra/styles/global.module.scss';

export const LoginForm = () => (
  <div className={styles.formBox}>
    <SlowInput label="Email:" name="email" />
    <SlowInput label="Senha:" name="password" />
    <Button type="submit">Enviar</Button>
  </div>
);
