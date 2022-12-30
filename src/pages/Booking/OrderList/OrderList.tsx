import React from 'react';
import { OrderDetailed } from '../../../types/common/OrderDetailed';
import { BikePreview } from '../../Catalog/BikePreview/BikePreview';

import styles from './OrderList.module.css';

interface OrderListProps {
  title: string;
  orders: OrderDetailed[];
  onClick: (order: OrderDetailed) => void;
}

export const OrderList = ({ title, orders, onClick }: OrderListProps) => {
  if (orders.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <section className="catalog">
        {orders.length > 0 &&
          orders.map((order) => <BikePreview key={order._id} bike={order.bike} onDetailClick={() => onClick(order)} />)}
      </section>
    </>
  );
};
