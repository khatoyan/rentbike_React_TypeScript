import React from 'react';
import cx from 'classnames';
import { pluralize } from '@skbkontur/ui-helpers';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Catalog.module.css';
import { Tabs } from '../../components/Tabs';

import { CatalogEmpty } from './CatalogEmpty/CatalogEmpty';
import { BikePreview } from './BikePreview/BikePreview';
import { Bike } from '../../types/domain/Bike';
import { RentPoint } from '../../types/domain/RentPoint';
import { api } from '../../api';
import { IPagination } from '../../types/common/pagination';
import { Paging } from '../../components/Paging/Paging';
import { getUpdatedQuery, getValueFromQuery } from '../../helpers/getValueFromQuery';
import { BikeModal } from './BikeModal/BikeModal';

const pageQueryName = 'page';
const pointIdQueryName = 'pointId';

export const Catalog: React.FC = () => {
  const [selectedBike, setSelectedBike] = React.useState<Bike | null>(null);
  const [bikeList, setBikeList] = React.useState<IPagination<Bike>>(null);
  const [points, setPoints] = React.useState<RentPoint[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = Number(getValueFromQuery(location.search, pageQueryName) || 1);
  const activePointId = getValueFromQuery(location.search, pointIdQueryName) || '';

  React.useEffect(() => {
    (async () => {
      const [a, b] = await Promise.all([api.catalog.getBikes(currentPage, activePointId), api.point.getPoints()]);
      setBikeList(a);
      setPoints(b);
    })();
  }, [currentPage, activePointId]);

  const onChangePoint = (pointId: string) => {
    const query = getUpdatedQuery(location.search, {
      [pageQueryName]: undefined,
      [pointIdQueryName]: pointId || undefined,
    });

    navigate(`${location.pathname}${query}`);
  };

  const onChangePage = (page: number) => {
    const query = getUpdatedQuery(location.search, {
      [pageQueryName]: page.toString(),
    });

    navigate(`${location.pathname}${query}`);
  };

  const onCloseBikeModal = () => {
    setSelectedBike(null);
  };

  return (
    <>
      <header className={styles.header}>
        <Tabs.Wrapper>
          {points.map((point) => (
            <Tabs.Item
              key={point._id}
              text={point.address}
              isActive={point._id === activePointId}
              onClick={() => onChangePoint(point._id)}
            />
          ))}
          <Tabs.Item text="Все пункты" isActive={!activePointId} onClick={() => onChangePoint('')} />
        </Tabs.Wrapper>
        <aside className={styles.aside}>
          <a href="#modal-map" className={cx(styles.link, styles.iconMap)}>
            На карте
          </a>
          &nbsp; &nbsp;
          {bikeList && (
            <span>
              {bikeList.totalItems}&nbsp;
              {pluralize(bikeList.totalItems, ['велосипед', 'велосипеда', 'велосипедов'])}
            </span>
          )}
        </aside>
      </header>
      <section className={'catalog'}>
        {bikeList && bikeList.itemsInPage.length <= 0 && <CatalogEmpty />}
        {bikeList &&
          bikeList.itemsInPage.map((bike) => (
            <BikePreview key={bike._id} bike={bike} onRentClick={() => setSelectedBike(bike)} />
          ))}
      </section>
      {bikeList && <Paging currentPage={currentPage} totalPages={bikeList.pages} onChangePage={onChangePage} />}
      {selectedBike && <BikeModal bike={selectedBike} onClose={onCloseBikeModal} />}
    </>
  );
};
