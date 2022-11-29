import { memo } from 'react';
import styles from './alert.module.scss';

export type Props = {
  type: 'success' | 'error';
  message: string;
};

const AlertComponent = ({ type, message }: Props) => (
  <p className={`${styles[type]}`}>{message}</p>
);

export const Alert = memo(AlertComponent);
