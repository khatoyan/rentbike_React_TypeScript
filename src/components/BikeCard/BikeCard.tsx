import React from 'react';
import clsx from 'clsx';

import styles from './BikeCard.module.css';

import { getImagePathById } from '../../helpers/getValueFromQuery';
import { Button } from '../Button';
import { Bike } from '../../api/Api.types';

interface CardProps {
  bike: Bike;
  onRent?: () => void;
  onLayoutClick?: () => void;
}

export const BikeCard: React.FC<CardProps> = ({ bike, onRent, onLayoutClick }) => {
  return (
    <div className={clsx(styles.bikeCard, onRent && styles.bigCard)} onClick={onLayoutClick}>
      <a className={styles.imgLink}>
        <img src={getImagePathById(bike._id)} alt="bikeImage" />
      </a>

      <div>
        <div className={styles.bikeTitle}>{bike.name}</div>
        <div>{bike.cost} р/час</div>
      </div>

      {onRent && (
        <div className={styles.buttonContainer}>
          <Button onClick={onRent}>Арендовать</Button>
        </div>
      )}
    </div>
  );
};
