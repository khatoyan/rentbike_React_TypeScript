import React from 'react';
import cx from 'classnames';
import { pluralize } from '@skbkontur/ui-helpers';

import Dots from '../../img/dots.svg';
import Bars from '../../img/bars.svg';

import styles from './Catalog.module.css';
import { Tabs } from '../../components/Tabs';
import { Switcher } from '../../components/Switcher/Switcher';

import { CatalogEmpty } from './CatalogEmpty/CatalogEmpty';
import { BikePreview } from './BikePreview/BikePreview';
import { Bike } from '../../types/domain/Bike';
import { RentPoint } from '../../types/domain/RentPoint';
import { api } from '../../api';
import { IPagination } from '../../types/common/pagination';
import { Paging } from '../../components/Paging/Paging';

export const Catalog: React.FC = () => {
  const [activePointId, setActivePointId] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [bikeList, setBikeList] = React.useState<IPagination<Bike>>(null);
  const [points, setPoints] = React.useState<RentPoint[]>([]);
  React.useEffect(() => {
    (async () => {
      const [a, b] = await Promise.all([api.catalog.getBikes(currentPage, activePointId), api.point.getPoints()]);
      setBikeList(a);
      setPoints(b);
    })();
  }, [currentPage, activePointId]);

  const onChangePoint = (pointId: string) => {
    setActivePointId(pointId);
    setCurrentPage(1);
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
          <Switcher.Wrapper>
            <Switcher.Item id="cat-1" icon={<Dots />} />
            <Switcher.Item id="cat-2" icon={<Bars />} />
          </Switcher.Wrapper>
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
        {bikeList && bikeList.itemsInPage.map((bike) => <BikePreview key={bike._id} bike={bike} />)}
      </section>
      {bikeList && <Paging currentPage={currentPage} totalPages={bikeList.pages} onChangePage={setCurrentPage} />}
    </>
  );
};
