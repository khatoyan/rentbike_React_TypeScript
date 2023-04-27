import React from 'react';

import styles from './BikeCardModal.module.css';

import { BikeModalContainer } from './BikeModalContainer';
import { Bike } from 'src/api/Api.types';
import { Button } from '../Button';

interface BikeCardModalProps {
  bike: Bike;
  onClose: () => void;
  onRent: () => void;
}

export const BikeCardModal: React.FC<BikeCardModalProps> = ({ bike, onClose, onRent }) => {
  return (
    <BikeModalContainer bike={bike} onClose={onClose}>
      <div className={styles.info}>
        <p className={styles.codeWrapper}>{bike.cost} р/час</p>
        <Button onClick={onRent}>Арендовать</Button>
      </div>
    </BikeModalContainer>
  );
};
