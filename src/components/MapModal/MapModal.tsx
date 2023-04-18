import React from 'react';
import { Modal } from '../Modal';
import Map from '../../img/map.png';

interface MapModalProps {
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ onClose }) => {
  return (
    <Modal width={1000} title="Пункты проката" onClose={onClose}>
      <img src={Map} alt="Карта" />
    </Modal>
  );
};
