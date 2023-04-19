import React from 'react';
import Map from '../../img/map.png';

import styles from './BikeCardModal.module.css';

import { getImagePathById } from '../../helpers/getValueFromQuery';
import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';
import { Button } from '../Button';

interface BikeCardModalProps {
  bike: Bike;
  onClose: () => void;
  onRent?: () => void;
}

export const BikeCardModal: React.FC<BikeCardModalProps> = ({ bike, onClose, onRent }) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className={styles.bikeModalImg} src={getImagePathById(bike._id)} alt="bigBike" />
        <div className={styles.info}>
          <p className={styles.codeWrapper}>{bike.cost} р/час</p>
          <Button onClick={onRent}>Арендовать</Button>
        </div>
      </div>
      <div className={styles.mapWrapper}>
        <h3 className={styles.mapWrapperTitle}>Пункты проката</h3>
        <img src={Map} alt="map" />
      </div>
    </Modal>
  );
};
