import { PropsWithChildren } from 'react';
import styles from './list-box.module.scss';

export const ListBox = ({ children }: PropsWithChildren) => (
  <div className={styles.box}>{children}</div>
);
