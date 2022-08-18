import React from 'react';
import cx from 'classnames';

import { Bike } from '../../../types/domain/Bike';

import styles from './BikePreview.module.css';
import { Button } from '../../../components/Button/Button';

interface BikePreviewProps {
  bike: Bike;
  onRentClick: () => void;
}

export const BikePreview: React.FC<BikePreviewProps> = ({ bike, onRentClick }: BikePreviewProps) => {
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
          <Button onClick={onRentClick}>Арендовать</Button>
        </footer>
      )}
    </div>
  );
};
