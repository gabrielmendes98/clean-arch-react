import { PropsWithChildren } from 'react';
import styles from './form-box.module.scss';

export const FormBox = ({ children }: PropsWithChildren) => (
  <div className={styles.box}>{children}</div>
);
