import React from 'react';
import cx from 'classnames';

import { Bike } from '../../../types/domain/Bike';

import styles from './BikePreview.module.css';
import { Button } from '../../../components/Button/Button';

interface BikePreviewProps {
  bike: Bike;
  onDetailClick?: () => void;
  onRentClick?: () => void;
}

export const BikePreview: React.FC<BikePreviewProps> = ({ bike, onRentClick, onDetailClick }: BikePreviewProps) => {
  return (
    <div className={cx(styles.bikeCard, { [styles.bikeCardHover]: onDetailClick })} onClick={onDetailClick}>
      <a className={cx(styles.bikeCardPreview)}>
        <img src={`/api/catalog/bike/${bike._id}/img`} />
      </a>
      <h4>{bike.name}</h4>
      <p>{bike.cost} ₽/час</p>
      {onRentClick && (
        <footer className={styles.bikeCardFooter}>
          <Button onClick={onRentClick}>Арендовать</Button>
        </footer>
      )}
    </div>
  );
};
