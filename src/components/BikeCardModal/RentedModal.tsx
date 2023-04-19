import React from 'react';
import Map from '../../img/map.png';

import styles from './BikeCardModal.module.css';
import clsx from 'clsx';

import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';
import { RentData } from 'src/helpers/getOnRentTime';
import { Button } from '../Button';
import { getImagePathById } from '../../helpers/getValueFromQuery';

interface RentedModalProps {
  bike: Bike;
  rentData: RentData;
  onClose: () => void;
  onPass: () => void;
}

export const RentedModal: React.FC<RentedModalProps> = ({ bike, rentData, onClose, onPass }) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className={styles.bikeModalImg} src={getImagePathById(bike._id)} alt="bigBike" />

        <div className={clsx(styles.info, styles.infoRented)}>
          <p>Время аренды</p>
          <h1 className={styles.onRentTime}>
            {rentData.hours}ч {rentData.min} мин
          </h1>
          <div className={styles.buttonWrapper}>
            <Button onClick={onPass}>Сдать</Button>
            <span>{rentData.currCost} ₽</span>
          </div>
        </div>
      </div>
      <div className={styles.mapWrapper}>
        <h3 className={styles.mapWrapperTitle}>Пункты проката</h3>
        <img src={Map} alt="map" />
      </div>
    </Modal>
  );
};
