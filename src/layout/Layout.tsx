import React, { useState } from 'react';
import Logo from './img/logo.svg';

import { RegistrationFormData, RegistrationModal } from '../components/RegistrationModal/RegistrationModal';
import { LoginFormData, LoginModal } from '../components/LoginModal/LoginModal';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import PeopleIcon from '../img/people.svg';
import { UserData } from '../api/Api.types';

import styles from './Layout.module.css';

interface LayoutProps {
  userData: null | UserData;
  onLogin: (login: string, password: string) => Promise<void>;
  onRegister: (login: string, password: string) => Promise<void>;
}

export const Layout: React.FC<LayoutProps> = ({ children, userData, onLogin, onRegister }) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayRegistration, setDisplayRegistration] = useState(false);

  const handleRegister = async (data: RegistrationFormData) => {
    await onRegister(data.email, data.password);
    setDisplayRegistration(false);
  };
  const handleLogin = async (data: LoginFormData) => {
    await onLogin(data.email, data.password);
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
            {!userData?.login && (
              <>
                <Button onClick={() => setDisplayLogin(true)}>Войти</Button>
                <Button light onClick={() => setDisplayRegistration(true)}>
                  Регистрация
                </Button>
              </>
            )}
            {userData?.login && (
              <>
                <a className={styles.books} href="/books">
                  Мои бронирования
                </a>
                <Dropdown.Wrapper
                  title={
                    <span className={styles.login}>
                      <PeopleIcon />
                      &nbsp;
                      {userData.login || 'Unknown'}
                    </span>
                  }
                >
                  {/* eslint-disable-next-line no-console */}
                  <Dropdown.Item onClick={() => console.log('redirect to settings')}>Настройки</Dropdown.Item>
                </Dropdown.Wrapper>
              </>
            )}
          </div>
          {displayLogin && (
            <LoginModal
              onLogin={handleLogin}
              onClose={() => setDisplayLogin(false)}
              onRegistrClick={() => setDisplayRegistration(true)}
            />
          )}
          {displayRegistration && (
            <RegistrationModal
              onRegister={handleRegister}
              onClose={() => setDisplayRegistration(false)}
              onLoginClick={() => setDisplayLogin(true)}
            />
          )}
        </header>
      </div>

      <div className={styles.main}>{children}</div>
    </div>
  );
};
