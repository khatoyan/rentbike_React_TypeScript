import React from 'react';
import cx from 'classnames';

import styles from './Paging.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export const Paging = ({ currentPage, totalPages, onChangePage }: Props) => {
  const list = new Array(totalPages)
    .fill(null)
    .map((tmp, index) => ({ number: index + 1, isActive: currentPage === index + 1 }));
  return (
    <section className={styles.pagination}>
      {list.map((page) => (
        <a
          key={`num_${page.number}`}
          className={cx(styles.link, { [styles.active]: page.isActive })}
          onClick={() => onChangePage(page.number)}
        >
          {page.number}
        </a>
      ))}
      {currentPage < totalPages && (
        <a className={styles.next} onClick={() => onChangePage(currentPage + 1)}>
          Дальше
        </a>
      )}
    </section>
  );
};
