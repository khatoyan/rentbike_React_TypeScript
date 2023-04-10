import React from 'react';
import EmptyImg from '../../img/empty.svg';

import styles from './EmptyPage.module.css';

export const EmptyPage: React.FC = () => {
  return (
    <main className={styles.emptyMain}>
      <div className={styles.emptyWrapper}>
        <EmptyImg />
        <p>Велосипеды закончились</p>
      </div>
    </main>
  );
};
