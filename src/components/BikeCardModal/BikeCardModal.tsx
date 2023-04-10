import React from 'react';
import map from '../../img/map.png';

import styles from './BikeCardModal.module.css';

import { Modal } from '../Modal';
import { Bike } from 'src/api/Api.types';
import { Button } from '../Button';

interface BikeCardModalProps {
  bike: Bike;
  onClose: () => void;
}

export const BikeCardModal: React.FC<BikeCardModalProps> = ({ bike, onClose }: BikeCardModalProps) => {
  return (
    <Modal width={800} onClose={onClose} title={bike.name}>
      <div className={styles.infoWrapper}>
        <img className="bikeModalImg" src={bike.img} alt="bigBike" />
        <div className={styles.info}>
          <p className="bikeText">{bike.cost} р/час</p>
          <a href="#mapModal">
            <Button>Арендовать</Button>
          </a>
        </div>
      </div>
      <div className={styles.mapWrapper}>
        <h3 className="map-wrapperTitle">Пункты проката</h3>
        <img src="{map}" alt="map" />
      </div>
    </Modal>
  );
};
