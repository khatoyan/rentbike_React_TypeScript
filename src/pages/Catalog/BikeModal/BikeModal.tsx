import React from 'react';

import { Bike } from '../../../types/domain/Bike';
import { Modal } from '../../../components/Modal/Modal';
import { Button } from '../../../components/Button/Button';
import FakeMap from '../../../img/map.png';
import FakeQRcode from '../../../img/qr.png';

import classes from './BikeModal.module.css';
import { api } from '../../../api';

interface BikeModalProps {
  bike: Bike;
  onClose: () => void;
}

export const BikeModal: React.FC<BikeModalProps> = ({ bike, onClose }) => {
  const [isRented, setIsRented] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res = await api.catalog.getBike(bike._id);
      setIsRented(res.isRented);
      setLoading(false);
    })();
  }, []);

  const onClickRent = () => {
    api.order.createOrder(bike._id);
    onClose();
  };

  return (
    <Modal width={680} onClose={onClose} title={bike.name}>
      <div className={classes.bike}>
        <div className={classes.content}>
          <img src={`/api/catalog/bike/${bike._id}/img`} alt="bike" />
          <h4 className={classes.subheader}>Пункт проката</h4>
          <img src={FakeMap} alt="map" />
        </div>
        <aside className={classes.aside}>
          {loading && <p>Загружаем...</p>}
          {isRented && !loading && (
            <>
              Код получения
              <br />
              <br />
              <img src={FakeQRcode} alt="" />
            </>
          )}
          {!isRented && !loading && (
            <>
              <h3 data-field="bike-cost">{bike.cost}&nbsp;₽/час</h3>
              <br />
              <Button onClick={onClickRent}>Арендовать</Button>
            </>
          )}
        </aside>
      </div>
    </Modal>
  );
};
