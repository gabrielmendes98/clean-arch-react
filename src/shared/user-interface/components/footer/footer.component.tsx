import { memo } from 'react';
import styles from './footer.module.scss';

export const FooterComponent = () => (
  <footer className={styles.footer}>
    &copy; Copyright 2022, Gabriel Santiago
  </footer>
);

export const Footer = memo(FooterComponent);
