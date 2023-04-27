import React from 'react';

import styles from './BikeCardModal.module.css';
import clsx from 'clsx';

import { BikeModalContainer } from './BikeModalContainer';
import { Bike } from 'src/api/Api.types';
import { RentData } from 'src/helpers/getOnRentTime';
import { Button } from '../Button';

interface RentedModalProps {
  bike: Bike;
  rentData: RentData;
  onClose: () => void;
  onPass: () => void;
}

export const RentedModal: React.FC<RentedModalProps> = ({ bike, rentData, onClose, onPass }) => {
  return (
    <BikeModalContainer bike={bike} onClose={onClose}>
      <div className={clsx(styles.info, styles.infoRented)}>
        <p>Время аренды</p>
        <h1 className={styles.onRentTime}>
          {rentData.hours} ч {rentData.min} мин
        </h1>
        <div className={styles.buttonWrapper}>
          <Button onClick={onPass}>Сдать</Button>
          <span>{rentData.currCost * bike.cost} ₽</span>
        </div>
      </div>
    </BikeModalContainer>
  );
};
