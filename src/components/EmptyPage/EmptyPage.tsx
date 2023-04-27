import React from 'react';
import EmptyImg from '../../img/empty.svg';

import styles from './EmptyPage.module.css';

interface Props {
  emptyText: string;
}

export const EmptyPage = ({ emptyText }: Props) => {
  return (
    <main className={styles.emptyMain}>
      <div className={styles.emptyWrapper}>
        <EmptyImg />
        <p>{emptyText}</p>
      </div>
    </main>
  );
};
