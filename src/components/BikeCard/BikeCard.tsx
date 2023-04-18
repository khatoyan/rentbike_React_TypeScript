import React, { useRef } from 'react';

import styles from './BikeCard.module.css';

import { api } from 'src/api';
import { Button } from '../Button';
import { Bike } from '../../api/Api.types';
import clsx from 'clsx';

interface CardProps {
  bike: Bike;
  onRent?: () => void;
  onLayoutClick?: () => void;
}

export const BikeCard: React.FC<CardProps> = ({ bike, onRent, onLayoutClick }) => {
  if (!onRent) {
    return (
      <div className={styles.bikeCard} onClick={onLayoutClick}>
        <a className={styles.imgLink}>
          <img src={`/api/catalog/bike/${bike._id}/img`} alt="bikeImage" />
        </a>

        <div>
          <div className={styles.bikeTitle}>{bike.name}</div>
          <div>{bike.cost} р/час</div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.bikeCard, styles.bigCard)}>
      <a className={styles.imgLink}>
        <img src={`/api/catalog/bike/${bike._id}/img`} alt="bikeImage" />
      </a>

      <div>
        <div className={styles.bikeTitle}>{bike.name}</div>
        <div>{bike.cost} р/час</div>
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={onRent}>Арендовать</Button>
      </div>
    </div>
  );
};
