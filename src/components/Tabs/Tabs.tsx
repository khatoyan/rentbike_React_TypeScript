import clsx from 'clsx';
import React, { useState } from 'react';

import { RentPoint } from '../../api/Api.types';
import { Button } from '../Button';
import { MapModal } from '../MapModal';
import SmallMap from '../../img/map.svg';
import Bars from '../../img/bars.svg';
import Dots from '../../img/dots.svg';

import styles from './Tabs.module.css';

interface Props {
  points: RentPoint[];
  bikesCount?: number;
}

export const Tabs = ({ points, bikesCount = 0 }: Props) => {
  const [currentPointId, setCurrentPointId] = useState('');
  const [isMapModalVisible, setMapModalVisible] = useState(false);

  const onPointChange = (pointId = '') => {
    setCurrentPointId(pointId);
  };

  return (
    <section className={styles.catalogHeader}>
      {isMapModalVisible && <MapModal onClose={() => setMapModalVisible(false)} />}

      <section className={styles.tabs}>
        {points.map((point) => (
          <a
            key={point._id}
            className={clsx(styles.tabsLink, currentPointId === point._id ? styles.isActive : '')}
            onClick={() => onPointChange(point._id)}
          >
            {point.address}
          </a>
        ))}
        <a
          className={clsx(styles.tabsLink, currentPointId === '' ? styles.isActive : '')}
          onClick={() => onPointChange()}
        >
          Все пункты
        </a>
      </section>
      <div className={styles.navPanel}>
        <Button className={styles.buttonContainer} link onClick={() => setMapModalVisible(true)}>
          <SmallMap />
          &nbsp;На карте
        </Button>

        <div className="nav-panel__label">
          <input className={styles.catalogRadio} id="inp1" type="radio" checked name="dots" />
          <label htmlFor="inp1">
            <Bars />
          </label>
          <input className={styles.catalogRadio} id="inp2" type="radio" name="dots" />
          <label htmlFor="inp2">
            <Dots />
          </label>
        </div>

        <p className={styles.bikeCount}>{bikesCount} велосипедов</p>
      </div>
    </section>
  );
};
