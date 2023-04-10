import React from 'react';

import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerContent}>
        <p className={styles.companyName}>СКБ Контур c 1988 года</p>
        <a className={styles.footerLink} href="#">
          Правовые документы
        </a>
      </section>
    </footer>
  );
};
