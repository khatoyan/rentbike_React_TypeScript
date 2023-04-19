import React from 'react';

import { Bike } from '../../api/Api.types';

import { BikeCard } from '../../components/BikeCard';
import styles from './Catalog.module.css';

interface CatalogSectionProps {
  data: Bike[];
  onLayoutClick: (bike: Bike) => void;
}

export const CatalogSection = ({ data, onLayoutClick }: CatalogSectionProps) => {
  return (
    <div className={styles.catalog}>
      {data.map((bike) => (
        <BikeCard onLayoutClick={() => onLayoutClick(bike)} bike={bike} key={bike._id} />
      ))}
    </div>
  );
};
