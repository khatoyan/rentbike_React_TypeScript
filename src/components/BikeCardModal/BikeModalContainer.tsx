import React from 'react';
import Map from '../../img/map.png';

import styles from './BikeCardModal.module.css';

import { getImagePathById } from '../../helpers/getValueFromQuery';
import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';

interface BikeModalContainerProps {
  bike: Bike;
  children: React.ReactNode;
  onClose: () => void;
}

export const BikeModalContainer: React.FC<BikeModalContainerProps> = ({ bike, children, onClose }) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className={styles.bikeModalImg} src={getImagePathById(bike._id)} alt="bigBike" />
        {children}
      </div>
      <div className={styles.mapWrapper}>
        <h3 className={styles.mapWrapperTitle}>Пункты проката</h3>
        <img src={Map} alt="map" />
      </div>
    </Modal>
  );
};
