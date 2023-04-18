import React, { useEffect, useRef, useState } from 'react';

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
  const [bikes, setbikes] = useState<null | Pagination<Bike>>(null);
  const [currBike, setCurrBike] = useState<Bike>();
  const [qrCode, setQrCode] = useState('');
  const [currentPointId, setCurrentPointId] = useState('');

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
    setbikes(bikes);
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

      <Tabs points={points} bikesCount={bikes?.itemsInPage.length} />
      <div className={styles.catalog}>
        {bikes ? (
          bikes.itemsInPage.map((bike) => (
            <BikeCard
              bike={bike}
              key={bike._id}
              onRent={() => {
                setCurrBike(bike);
                setBikeModalVisible(true);
              }}
            />
          ))
        ) : (
          <EmptyPage emptyText="Велосипеды закончились" />
        )}
      </div>
      <Paging totalPages={bikes?.pages || 1} />
    </section>
  );
};
