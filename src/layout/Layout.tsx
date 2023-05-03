import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

import Logo from './img/logo.svg';
import PeopleIcon from '../img/people.svg';

import { RegistrationFormData, RegistrationModal } from '../components/RegistrationModal/RegistrationModal';
import { LoginFormData, LoginModal } from '../components/LoginModal/LoginModal';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { Toggler } from '../components/Toggler';
import { Footer } from '../components/Footer';
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
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData?.login) {
      navigate('/');
    }
  }, [userData?.login]);

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }

    setTheme('dark');
  };

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
          <a onClick={() => navigate('/')}>
            <Logo />
          </a>
          <div className={styles.headerButtons}>
            <Toggler checked={theme === 'light'} onClick={() => handleTheme()} />
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
                <a className={styles.books} onClick={() => navigate('/books')}>
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
                  <Dropdown.Item onClick={() => navigate('/settings')}>Настройки</Dropdown.Item>
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
      <Footer />
    </div>
  );
};
