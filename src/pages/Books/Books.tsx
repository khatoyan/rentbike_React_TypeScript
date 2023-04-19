import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../api';
import { Bike, Order } from '../../api/Api.types';
import { getOnRentTime } from '../../helpers/getOnRentTime';
import { CatalogSection } from '../Catalog/CatalogSection';
import { EmptyPage } from '../../components/EmptyPage';
import { BookingModal, RentedModal } from '../../components/BikeCardModal';

import styles from './Books.module.css';

export const Books: React.FC = () => {
  const { orderId } = useParams();
  const [activeOrder, setActiveOrder] = useState<Order>();
  const [rentedBike, setRentedBike] = useState<Bike>();
  const [passedBikes, setPassedBikes] = useState<Bike[]>([]);
  const [rentedBikes, setRentedBikes] = useState<Bike[]>([]);
  const [currBike, setCurrBike] = useState<Bike>();
  const [qrCode, setQrCode] = useState('');

  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [isRentedModalVisible, setRentedModalVisible] = useState(false);

  useEffect(() => {
    getOrders();
    handleStartRent();
  }, []);

  const getOrders = async () => {
    const orders = await api.order.getOrders();
    const passedOrders = await api.order.getCompletedOrders();

    api.order.startRent(orders[0]._id);
    api.order.stopRent(orders[0]._id);

    orders.map(async (order) => {
      const tmp = await api.catalog.getBike(order.bikeId);
      setRentedBikes((orders) => [...orders, tmp]);
    });

    passedOrders.map(async (passedOrder) => {
      const tmp = await api.catalog.getBike(passedOrder.bikeId);
      setPassedBikes((passedOrders) => [...passedOrders, tmp]);
    });
  };

  const handleStartRent = async () => {
    if (!orderId) {
      return;
    }

    const currRentedBikeOrder = await api.order.getOrder(orderId);
    const currRentedBike = await api.catalog.getBike(currRentedBikeOrder.bikeId);

    setActiveOrder(currRentedBikeOrder);
    setRentedModalVisible(true);
    setRentedBike(currRentedBike);
  };

  const handleStopRent = async (activeOrder: Order) => {
    if (!activeOrder) {
      return;
    }

    const res = await api.order.stopRent(activeOrder._id);
    setRentedModalVisible(false);
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

  const handleLayoutClick = (bike: Bike) => {
    setCurrBike(bike);
    handleCreateOrder();
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
      {isRentedModalVisible && rentedBike && activeOrder?.start && (
        <RentedModal
          bike={rentedBike}
          rentData={getOnRentTime(activeOrder?.start)}
          onPass={() => handleStopRent(activeOrder)}
          onClose={() => setRentedModalVisible(false)}
        />
      )}

      {isBookingModalVisible && currBike && (
        <BookingModal bike={currBike} qrCode={qrCode} onClose={() => setBookingModalVisible(false)} />
      )}

      <h2>Мои бронирования</h2>
      <CatalogSection data={rentedBikes} onLayoutClick={handleLayoutClick} />

      <h3>История бронирований</h3>
      <CatalogSection data={passedBikes} onLayoutClick={handleLayoutClick} />
    </section>
  );
};
