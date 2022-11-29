import styles from './alert.module.scss';

export type Props = {
  type: 'success' | 'error';
  message: string;
};

export const Alert = ({ type, message }: Props) => (
  <p className={`${styles[type]}`}>{message}</p>
);
