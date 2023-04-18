import React from 'react';
import Map from '../../img/map.png';

import styles from './BikeCardModal.module.css';

import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';

interface BookingModalProps {
  bike: Bike;
  qrCode: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bike, qrCode, onClose }) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className={styles.bikeModalImg} src={`/api/catalog/bike/${bike._id}/img`} alt="bigBike" />
        <div className={styles.info}>
          <p className={styles.codeWrapper}>
            Код получения <span className={styles.keyCode}>12367</span>
          </p>
          <img src={qrCode} alt="QR" />
        </div>
      </div>
      <div className={styles.mapWrapper}>
        <h3 className={styles.mapWrapperTitle}>Пункты проката</h3>
        <img src={Map} alt="map" />
      </div>
    </Modal>
  );
};
