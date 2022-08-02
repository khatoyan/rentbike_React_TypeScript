import React from 'react';
import EmptyImg from '../../../img/empty.svg';

import styles from './CatalogEmpty.module.css';

export const CatalogEmpty = () => {
  return (
    <section className={styles.empty}>
      <div className={styles.message}>
        <EmptyImg />
        <p>Пока не бронировали</p>
      </div>
    </section>
  );
};
