import React from 'react';
import Map from '../../img/map.png';
import { Modal } from '../Modal/Modal';

interface Props {
  onClose: () => void;
}

export const PointsMapModal = ({ onClose }: Props) => {
  return (
    <Modal width={1024} title={'Пункты проката'} onClose={onClose}>
      <img src={Map} alt="map" />
    </Modal>
  );
};
