import React, { useEffect, useRef, useState } from 'react';

import { api } from '../../api';
import { RentPoint, Bike, Pagination } from '../../api/Api.types';
import { useSearchParams } from '../../hooks/useSearchParams';

import { EmptyPage } from '../../components/EmptyPage';
import { BikeCard } from '../../components/BikeCard';
import { BookingModal } from '../../components/BikeCardModal';

import styles from './Books.module.css';

const pageQueryName = 'page';
const pointIdQueryName = 'pointId';

export const Books: React.FC = () => {
  const [rentedBikes, setRentedBikes] = useState<Bike[]>([]);
  const [passedBikes, setPassedBikes] = useState<Bike[]>([]);
  const [currBike, setCurrBike] = useState<Bike>();
  const [qrCode, setQrCode] = useState('');
  const [isRented, setRented] = useState(false);

  const [isBookingModalVisible, setBookingModalVisible] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const orders = await api.order.getOrders();

    orders[0].end = '';
    /*
      Заглушка а.к.а отсканировали QR код и байк арендовался
    */

    for (const order of orders) {
      const tempBike = await api.catalog.getBike(order.bikeId);
      if (order.end?.length !== 0) {
        setRentedBikes((prevBikes) => [...prevBikes, tempBike]);
      } else {
        setPassedBikes((prevBikes) => [...prevBikes, tempBike]);
      }
    }
  };

  const handleQrOrder = async () => {
    setRented(true);
  };

  const handleCreateOrder = async () => {
    if (!currBike) {
      return;
    }

    const orderBike = await api.order.createOrder(currBike._id);
    const getQrCode = await api.order.getQRCode(orderBike._id);

    setQrCode(getQrCode.code);
    setBookingModalVisible(true);
  };

  if (rentedBikes.length === 0 && passedBikes.length === 0) {
    return (
      <section className="container">
        <h2>Мои бронирования</h2>
        <EmptyPage emptyText="Тут пусто" />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {isBookingModalVisible && currBike && (
        <BookingModal bike={currBike} qrCode={qrCode} onClose={() => setBookingModalVisible(false)} />
      )}

      <h2>Мои бронирования</h2>
      <div className={styles.catalog}>
        {rentedBikes.map((bike) => (
          <BikeCard
            onLayoutClick={() => {
              setCurrBike(bike);
              handleCreateOrder();
            }}
            bike={bike}
            key={bike._id}
          />
        ))}
      </div>

      <h3>История бронирований</h3>
      <div className={styles.catalog}>
        {passedBikes.map((bike) => (
          <BikeCard
            onLayoutClick={() => {
              setCurrBike(bike);
              handleCreateOrder();
            }}
            bike={bike}
            key={bike._id}
          />
        ))}
      </div>
    </section>
  );
};
