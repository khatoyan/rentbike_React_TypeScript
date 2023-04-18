import React from 'react';
import Map from '../../img/map.png';

import styles from './BikeCardModal.module.css';
import clsx from 'clsx';

import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';
import { Button } from '../Button';

interface RentedModalProps {
  bike: Bike;
  onClose: () => void;
  onPass: () => void;
}

export const RentedModal: React.FC<RentedModalProps> = ({ bike, onClose, onPass }) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className={styles.bikeModalImg} src={`/api/catalog/bike/${bike._id}/img`} alt="bigBike" />

        <div className={clsx(styles.info, styles.infoRented)}>
          <p>Время аренды</p>
          <h1 className={styles.onRentTime}>1ч 23 мин</h1>
          <div className={styles.buttonWrapper}>
            <a href="#mapModal">
              <Button onClick={onPass}>Сдать</Button>
            </a>
            <span>640 ₽</span>
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
