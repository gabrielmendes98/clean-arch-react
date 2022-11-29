import { PropsWithChildren } from 'react';
import styles from './box.module.scss';

export const Box = ({ children }: PropsWithChildren) => (
  <div className={styles.box}>{children}</div>
);
