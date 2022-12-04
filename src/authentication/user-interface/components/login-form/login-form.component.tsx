import { Button } from 'shared/user-interface/components/button/button.component';
import { FastInput } from 'shared/user-interface/components/input/fast-input.component';
import styles from 'shared/infra/styles/global.module.scss';

export const LoginForm = () => (
  <div className={styles.formBox}>
    <FastInput label="Email:" name="email" />
    <FastInput label="Senha:" name="password" />
    <Button type="submit">Enviar</Button>
  </div>
);
