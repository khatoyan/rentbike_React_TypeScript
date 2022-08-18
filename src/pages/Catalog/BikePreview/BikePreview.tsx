import React from 'react';
import cx from 'classnames';

import { Bike } from '../../../types/domain/Bike';

import styles from './BikePreview.module.css';
import { Button } from '../../../components/Button/Button';

interface Props {
  bike: Bike;
}

export const BikePreview: React.FC<Props> = ({ bike }: Props) => {
  const withoutFooter = false;
  return (
    <div className={styles.bikeCard}>
      <a className={cx(styles.bikeCardPreview, { [styles.bikeCardNoFooter]: withoutFooter })}>
        <img src={`/api/catalog/bike/${bike._id}/img`} />
      </a>
      <h4>{bike.name}</h4>
      <p>{bike.cost} ₽/час</p>
      {!withoutFooter && (
        <footer className={styles.bikeCardFooter}>
          <Button>Арендовать</Button>
        </footer>
      )}
    </div>
  );
};
