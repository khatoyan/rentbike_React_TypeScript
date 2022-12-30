import React, { useState } from 'react';
import Logo from './img/logo.svg';
import { Button } from '../components/Button/Button';

import styles from './Layout.module.css';
import { RegistrationFormData, RegistrationModal } from '../components/RegistrationModal/RegistrationModal';
import { LoginFormData, LoginModal } from '../components/LoginModal/LoginModal';
import { UserContext } from '../context/UserContext';
import { Dropdown } from '../components/Dropdown';

import { PeopleIcon } from '../components/PeopleIcon/PeopleIcon';
import { useNavigate } from 'react-router-dom';

export const Layout: React.FC = ({ children }) => {
  const [displayLogin, setDisplayLogin] = React.useState(false);
  const [displayRegistration, setDisplayRegistration] = React.useState(false);
  const [displayCardRequisites, setDisplayCardRequisites] = React.useState(false);

  const userContext = React.useContext(UserContext);
  const navigate = useNavigate();

  const onRegister = async (data: RegistrationFormData) => {
    await userContext.onRegister(data.email, data.password);
    setDisplayRegistration(false);
  };
  const onLogin = async (data: LoginFormData) => {
    await userContext.onLogin(data.email, data.password);
    setDisplayLogin(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <header className={styles.content}>
          <a href="/">
            <Logo />
          </a>
          <div className={styles.headerButtons}>
            {!userContext.isLogged && (
              <>
                <Button onClick={() => setDisplayLogin(true)}>Войти</Button>
                <Button light onClick={() => setDisplayRegistration(true)}>
                  Регистрация
                </Button>
              </>
            )}
            {userContext.isLogged && (
              <>
                <a className={styles.books} href="/books">
                  Мои бронирования
                </a>
                <Dropdown.Wrapper
                  title={
                    <span>
                      <PeopleIcon />
                      {userContext.login || 'Unknown'}
                    </span>
                  }
                >
                  <Dropdown.Item onClick={() => navigate('/settings')}>Настройки</Dropdown.Item>
                  <hr />
                  <Dropdown.Item>Выйти</Dropdown.Item>
                </Dropdown.Wrapper>
              </>
            )}
          </div>
          {displayLogin && <LoginModal onClose={() => setDisplayLogin(false)} onLogin={onLogin} />}
          {displayRegistration && (
            <RegistrationModal onClose={() => setDisplayRegistration(false)} onRegister={onRegister} />
          )}
          {displayCardRequisites && <></>}
        </header>
      </div>

      <div className={styles.main}>{children}</div>

      <div className={styles.footer}>
        <footer className={styles.footerContent}>
          <a href="#" className={styles.footerLink}>
            <b>СКБ Контур</b> c 1988 года
          </a>
          <a href="#" className={styles.footerLink}>
            Правовые документы
          </a>
        </footer>
      </div>
    </div>
  );
};
