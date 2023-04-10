import React from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../../img/map.png';

import styles from './Main.module.css';
import { Button } from '../../components/Button/Button';

export const Main: React.FC = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/catalog');
  }

  return (
    <>
      <section className={styles.landing}>
        <h1 className={styles.title}>Сервис аренды велосипедов</h1>
        <p className={styles.subtitle}>240 велосипедов в Новосибирске</p>
        <div className={styles.actions}>
          <Button onClick={handleClick} className={styles.button}>
            Выбрать велосипед
          </Button>
          <a href="#map-page">Пункты проката</a>
        </div>
      </section>
      <section className={styles.map}>
        <h2 className={styles.mapTitle} id="map-page">
          Пункты проката
        </h2>
        <a href="/catalog" className={styles.mapWidget}>
          <img src={Map} alt="map" />
        </a>
      </section>
    </>
  );
};
