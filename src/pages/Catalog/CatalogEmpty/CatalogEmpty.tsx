import React from 'react';
import EmptyImg from '../../../img/empty.svg';
import { Center } from '@skbkontur/react-ui';

import styles from './CatalogEmpty.module.css';

export const CatalogEmpty = () => {
  return (
    <Center>
      <div className={styles.message}>
        <EmptyImg />
        <p>Пока не бронировали</p>
      </div>
    </Center>
  );
};
