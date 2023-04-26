import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { api } from '../../api';
import { Bike, Order } from '../../api/Api.types';
import { getOnRentTime } from '../../helpers/getOnRentTime';
import { CatalogSection } from '../Catalog/CatalogSection';
import { EmptyPage } from '../../components/EmptyPage';
import { PassedModal, RentedModal, BookingModal } from '../../components/BikeCardModal';

import styles from './Books.module.css';

export const Books: React.FC = () => {
  const { orderId } = useParams();
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [passedOrders, setPassedOrders] = useState<Order[]>([]);
  const [passedBikes, setPassedBikes] = useState<Bike[]>([]);
  const [rentedBikes, setRentedBikes] = useState<Bike[]>([]);

  const [currOrder, setCurrOrder] = useState<Order | null>();
  const [currBike, setCurrBike] = useState<Bike | null>();
  const [currBookedBike, setCurrBookedBike] = useState<Bike | null>();

  const [qrCode, setQrCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getBikes();

    if (!orderId) {
      return;
    }

    handleStartRent(orderId);
  }, []);

  const clearCatalog = () => {
    setActiveOrders([]);
    setPassedOrders([]);
    setRentedBikes([]);
    setPassedBikes([]);
  };

  const getBikes = async () => {
    clearCatalog();
    const orders = await api.order.getOrders();
    const completedOrders = await api.order.getCompletedOrders();

    for (const order of orders) {
      const tmp = await api.catalog.getBike(order.bikeId);
      setRentedBikes((orders) => [...orders, tmp]);
    }

    for (const order of completedOrders) {
      const tmp = await api.catalog.getBike(order.bikeId);
      setPassedBikes((orders) => [...orders, tmp]);
    }

    setActiveOrders(orders);
    setPassedOrders(completedOrders);
  };

  const handleStartRent = async (orderId: string) => {
    await api.order.startRent(orderId);
    const selectedOrder = await api.order.getOrder(orderId);
    const currBike = await api.catalog.getBike(selectedOrder.bikeId);
    await getBikes();

    setCurrOrder(selectedOrder);
    setCurrBookedBike(null);
    setCurrBike(currBike);
    navigate('/books');
  };

  const handleStopRent = async (order: Order) => {
    await api.order.stopRent(order._id);
    const ord = await api.order.getOrder(order._id);
    const currBike = await api.catalog.getBike(ord.bikeId);
    await getBikes();

    setCurrOrder(ord);
    setCurrBike(currBike);
  };

  const handlePassedLayoutClick = async (bikeId: string) => {
    const bike = await api.catalog.getBike(bikeId);
    const order = passedOrders.find((elem) => elem.bikeId === bikeId);

    setCurrOrder(order);
    setCurrBike(bike);
  };

  const handleLayoutClick = async (bikeId: string) => {
    const bike = await api.catalog.getBike(bikeId);
    const order = activeOrders.find((elem) => elem.bikeId === bikeId);

    if (!order) {
      return;
    }

    if (order.start) {
      setCurrBike(bike);
      setCurrOrder(order);
      return;
    }

    const qrCode = await api.order.getQRCode(order?._id);
    setQrCode(qrCode.code);
    setCurrBookedBike(bike);
    setCurrOrder(order);
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
      {currBike && currOrder?.start && currOrder?.end && (
        <PassedModal
          bike={currBike}
          startDate={currOrder?.start}
          endDate={currOrder?.end}
          finalCost={getOnRentTime(currOrder?.start, currOrder?.end).currCost * currBike.cost}
          onClose={() => setCurrBike(null)}
        />
      )}
      {currBike && currOrder?.start && !currOrder?.end && (
        <RentedModal
          bike={currBike}
          rentData={getOnRentTime(currOrder?.start)}
          onPass={() => handleStopRent(currOrder)}
          onClose={() => setCurrBike(null)}
        />
      )}

      {currBookedBike && <BookingModal bike={currBookedBike} qrCode={qrCode} onClose={() => setCurrBookedBike(null)} />}

      <h2>Мои бронирования</h2>
      <CatalogSection data={rentedBikes} onLayoutClick={handleLayoutClick} />

      <h3>История бронирований</h3>
      <CatalogSection data={passedBikes} onLayoutClick={handlePassedLayoutClick} />
    </section>
  );
};
