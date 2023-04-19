import React, { useEffect, useState } from 'react';

import { api } from '../../api';
import { RentPoint, Bike, Pagination } from '../../api/Api.types';
import { useSearchParams } from '../../hooks/useSearchParams';

import { EmptyPage } from '../../components/EmptyPage';
import { BikeCard } from '../../components/BikeCard';
import { BikeCardModal } from '../../components/BikeCardModal';
import { BookingModal } from '../../components/BikeCardModal';
import { Tabs } from '../../components/Tabs/Tabs';
import { Paging } from '../../components/Paging';

import styles from './Catalog.module.css';

const pageQueryName = 'page';
const pointIdQueryName = 'pointId';

export const Catalog: React.FC = () => {
  const [points, setPoints] = useState<RentPoint[]>([]);
  const [bikeData, setBikeData] = useState<null | Pagination<Bike>>(null);
  const [currBike, setCurrBike] = useState<Bike>();
  const [qrCode, setQrCode] = useState('');

  const [isBikeModalVisible, setBikeModalVisible] = useState(false);
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);

  const currentPage = Number(useSearchParams(pageQueryName)) || 1;
  const currentPoint = useSearchParams(pointIdQueryName) || '';

  useEffect(() => {
    getPoints();
  }, []);

  useEffect(() => {
    getBikes(currentPage, currentPoint);
  }, [currentPage, currentPoint]);

  const getPoints = async () => {
    const points = await api.point.getPoints();
    setPoints(points);
  };

  const getBikes = async (page?: number, pointId?: string) => {
    const bikes = await api.catalog.getBikes(page, pointId);
    setBikeData(bikes);
  };

  const handleOpenModal = (bike: Bike) => {
    setCurrBike(bike);
    setBikeModalVisible(true);
  };

  const handleCreateOrder = async () => {
    if (!currBike) {
      return;
    }

    const orderBike = await api.order.createOrder(currBike._id);
    const getQrCode = await api.order.getQRCode(orderBike._id);

    setQrCode(getQrCode.code);
    setBikeModalVisible(false);
    setBookingModalVisible(true);
  };

  return (
    <section className={styles.container}>
      {isBikeModalVisible && currBike && (
        <BikeCardModal
          bike={currBike}
          onRent={() => {
            handleCreateOrder();
          }}
          onClose={() => setBikeModalVisible(false)}
        />
      )}

      {isBookingModalVisible && currBike && (
        <BookingModal bike={currBike} qrCode={qrCode} onClose={() => setBookingModalVisible(false)} />
      )}

      <Tabs points={points} bikesCount={bikeData?.totalItems} />
      <div className={styles.catalog}>
        {bikeData ? (
          bikeData.itemsInPage.map((bike) => (
            <BikeCard
              bike={bike}
              key={bike._id}
              onRent={() => handleOpenModal(bike)}
              onLayoutClick={() => handleOpenModal(bike)}
            />
          ))
        ) : (
          <EmptyPage emptyText="Велосипеды закончились" />
        )}
      </div>
      <Paging totalPages={bikeData?.pages || 1} />
    </section>
  );
};
