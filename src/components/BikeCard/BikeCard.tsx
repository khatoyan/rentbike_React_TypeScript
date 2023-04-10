import React from 'react';

import styles from './BikeCard.module.css';
import { Button } from '../Button';
import { Bike } from '../../api/Api.types';

interface CardProps {
  bike: Bike;
}

export const BikeCard: React.FC<CardProps> = ({ bike }) => {
  return (
    <div className={styles.bikeCard}>
      <a className={styles.imgLink}>
        <img src={bike.img} alt="bikeImage" />
      </a>

      <div>
        <div className={styles.bikeTitle}>{bike.name}</div>
        <div>{bike.cost} р/час</div>
      </div>

      <div className={styles.buttonContainer}>
        <Button>Арендовать</Button>
      </div>
    </div>
  );
};
