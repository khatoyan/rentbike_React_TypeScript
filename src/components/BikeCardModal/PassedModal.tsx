import React from 'react';

import styles from './BikeCardModal.module.css';

import { BikeModalContainer } from './BikeModalContainer';
import { Bike } from 'src/api/Api.types';

const Month = [
  'Января',
  'Ферваля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

interface PassedModalProps {
  bike: Bike;
  startDate: string;
  endDate: string;
  finalCost: number;
  onClose: () => void;
}

export const PassedModal: React.FC<PassedModalProps> = ({ bike, startDate, endDate, finalCost, onClose }) => {
  const dayNumber = startDate.slice(8, 10);
  const monthNumber = Number(startDate.slice(5, 7));
  const d = startDate.slice(11, 16);
  const d2 = endDate.slice(11, 16);

  return (
    <BikeModalContainer bike={bike} onClose={onClose}>
      <div className={styles.info}>
        <p>
          {dayNumber} {Month[monthNumber]} {d} - {d2}
        </p>
        <h1 className={styles.finalCost}>{finalCost} ₽</h1>
      </div>
    </BikeModalContainer>
  );
};
