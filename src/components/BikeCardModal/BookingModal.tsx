import React, { useEffect, useState } from 'react';
import { api } from '../../api';

import styles from './BikeCardModal.module.css';

import { BikeModalContainer } from './BikeModalContainer';
import { Bike } from 'src/api/Api.types';

interface BookingModalProps {
  bike: Bike;
  qrCode: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bike, qrCode, onClose }) => {
  return (
    <BikeModalContainer bike={bike} onClose={onClose}>
      <div className={styles.info}>
        <p className={styles.codeWrapper}>
          Код получения <span className={styles.keyCode}>12367</span>
        </p>
        <img src={qrCode} alt="QR" />
      </div>
    </BikeModalContainer>
  );
};
