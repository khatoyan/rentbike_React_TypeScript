import React from 'react';
import Map from '../../img/map.png';

import styles from './BikeCardModal.module.css';

import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';
import { getImagePathById } from '../../helpers/getValueFromQuery';

interface PassedModalProps {
  bike: Bike;
  onClose: () => void;
}

export const PassedModal: React.FC<PassedModalProps> = ({ bike, onClose }) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className={styles.bikeModalImg} src={getImagePathById(bike._id)} alt="bigBike" />
        <div className={styles.info}>
          <p>21 июня 15:23–16:48</p>
          <h1 className={styles.finalCost}>640 ₽</h1>
        </div>
      </div>
      <div className={styles.mapWrapper}>
        <h3 className={styles.mapWrapperTitle}>Пункты проката</h3>
        <img src={Map} alt="map" />
      </div>
    </Modal>
  );
};
