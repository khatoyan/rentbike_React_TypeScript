import React, { useState } from 'react';

import { Center, Spinner } from '@skbkontur/react-ui';
import { api } from '../../api';
import { OrderDetailed } from '../../types/common/OrderDetailed';
import { CatalogEmpty } from '../Catalog/CatalogEmpty/CatalogEmpty';
import { BikeModal } from '../Catalog/BikeModal/BikeModal';
import { Order } from '../../types/domain/Order';
import { OrderList } from './OrderList/OrderList';
import { useParams } from 'react-router-dom';
import { useSearchParams } from '../../hooks/useSearchParams';

export const Booking = () => {
  const [orders, setOrders] = React.useState<OrderDetailed[]>([]);
  const [completedOrders, setCompletedOrders] = React.useState<OrderDetailed[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderDetailed | null>(null);

  const [loadingOrders, setOrdersIsFetching] = useState(true);
  const [loadingCompletedOrders, setCompletedOrdersIsFetching] = useState(true);

  const { orderId } = useParams<{ orderId?: string }>();

  const action = useSearchParams('action');

  const getDetailedOrders = async (orders: Order[]) => {
    const orderDetailedPromises = orders.map(async (order) => {
      const bike = await api.catalog.getBike(order.bikeId);
      const rentPoint = await api.point.getPointById(order.pointId);

      return {
        bike,
        rentPoint,
        _id: order._id,
        userId: order.userId,
        start: order.start,
        end: order.end,
      };
    });

    return Promise.all(orderDetailedPromises);
  };

  const openBikeModal = (selectedOrder: OrderDetailed) => {
    setSelectedOrder(selectedOrder);
  };

  React.useEffect(() => {
    const getOrders = async () => {
      setOrdersIsFetching(true);

      const orders = await api.order.getOrders();

      const ordersDetailed = await getDetailedOrders(orders);

      setOrders(ordersDetailed);
      setOrdersIsFetching(false);
    };

    getOrders();
  }, []);

  React.useEffect(() => {
    const getCompletedOrders = async () => {
      setCompletedOrdersIsFetching(true);
      const orders = await api.order.getCompletedOrders();

      const ordersDetailed = await getDetailedOrders(orders);

      setCompletedOrders(ordersDetailed);
      setCompletedOrdersIsFetching(false);
    };

    getCompletedOrders();
  }, []);

  React.useEffect(() => {
    const getOrder = async (orderId: string, action: string) => {
      if (action === 'start') {
        await api.order.startRent(orderId);
      }

      const order = await api.order.getOrder(orderId);

      const [orderDetailed] = await getDetailedOrders([order]);

      setSelectedOrder(orderDetailed);
    };

    if (orderId && action) {
      getOrder(orderId, action);
    }
  }, [orderId]);

  if (loadingOrders && loadingCompletedOrders) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <OrderList title="Мои бронирования" orders={orders} onClick={openBikeModal} />
      <OrderList title="История бронирований" orders={completedOrders} onClick={openBikeModal} />
      {orders.length === 0 && completedOrders.length === 0 && <CatalogEmpty />}
      {selectedOrder !== null && (
        <BikeModal
          isBooked={selectedOrder.bike.isBooked}
          bike={selectedOrder.bike}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};
