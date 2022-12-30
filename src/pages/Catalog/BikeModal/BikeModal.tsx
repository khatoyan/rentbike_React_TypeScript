import React from 'react';
import dayjs from 'dayjs';
import { Gapped } from '@skbkontur/react-ui';
import { Bike } from '../../../types/domain/Bike';
import { Modal } from '../../../components/Modal/Modal';
import { Button } from '../../../components/Button/Button';
import { api } from '../../../api';
import { OrderDetailed } from '../../../types/common/OrderDetailed';
import FakeMap from '../../../img/map.png';

import classes from './BikeModal.module.css';

interface BikeModalProps {
  bike: Bike;
  isBooked?: boolean;
  order?: OrderDetailed;
  onClose: (bikeIsBooked: boolean) => void;
}

export const BikeModal: React.FC<BikeModalProps> = ({ bike, order, isBooked = false, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [bikeIsBooked, setBookedStatus] = React.useState(isBooked);
  const [QRCode, setQrcode] = React.useState(null);

  const getQRCode = async (orderId: string) => {
    const QRCode = await api.order.getQRCode(orderId);

    setQrcode(QRCode.code);
  };

  React.useEffect(() => {
    if (isBooked) {
      getQRCode(order._id);
    }
  }, [isBooked]);

  const onClickRent = async () => {
    setLoading(true);
    const order = await api.order.createOrder(bike._id);

    await getQRCode(order._id);

    setLoading(false);
    setBookedStatus(true);
  };

  const getDifferenceOnMinutes = (date1: string, date2: string) => {
    const now = dayjs(date1);

    return now.diff(dayjs(date2), 'minutes');
  };

  const getDurationRent = () => {
    const diffOfMinutes = getDifferenceOnMinutes(new Date().toString(), order.start);

    const diffOfHours = Math.floor(diffOfMinutes / 60);

    const amountMinutes = diffOfMinutes - diffOfHours * 60;

    if (diffOfHours !== 0) {
      return `${diffOfHours} ч ${amountMinutes} мин`;
    }

    return `${amountMinutes} мин`;
  };

  const getDateRent = () => {
    return `${dayjs(order.start).format('hh:mm')}-${dayjs(order.end).format('hh:mm')}`;
  };

  const getCostRent = (date1: string, date2: string) => {
    const costOfMinute = bike.cost / 60;

    return Math.floor(costOfMinute * getDifferenceOnMinutes(date1, date2));
  };

  return (
    <Modal width={680} onClose={() => onClose(bikeIsBooked)} title={bike.name}>
      <div className={classes.bike}>
        <div className={classes.content}>
          <img src={`/api/catalog/bike/${bike._id}/img`} alt="bike" />
          <h4 className={classes.subheader}>Пункт проката</h4>
          <img src={FakeMap} alt="map" />
        </div>
        <aside className={classes.aside}>
          {loading && <p>Загружаем...</p>}
          {!loading && bikeIsBooked && QRCode && !order.start && (
            <>
              Код получения
              <br />
              <br />
              <img src={QRCode} alt="QRCode" />
            </>
          )}

          {!bikeIsBooked && !loading && !order && (
            <>
              <h3 data-field="bike-cost">{bike.cost}&nbsp;₽/час</h3>
              <br />
              <Button onClick={onClickRent}>Арендовать</Button>
            </>
          )}

          {bikeIsBooked && !loading && order?.start && !order?.end && (
            <Gapped vertical gap={24}>
              <div>
                Время аренды
                <h2>{getDurationRent()}</h2>
              </div>
              <Gapped gap={16}>
                <Button onClick={() => api.order.stopRent(order._id)}>Сдать велосипед</Button>
                <span>{getCostRent(new Date().toString(), order.start)}&nbsp;₽</span>
              </Gapped>
            </Gapped>
          )}

          {!loading && order?.start && order?.end && (
            <Gapped vertical gap={16}>
              <span>{getDateRent()}</span>
              <h2>{getCostRent(order.end, order.start)}&nbsp;₽</h2>
            </Gapped>
          )}
        </aside>
      </div>
    </Modal>
  );
};
