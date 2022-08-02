import React from 'react';
import Logo from './img/logo.svg';
import { Button } from '../components/Button/Button';

import styles from './Layout.module.css';
import { Modal } from '../components/Modal/Modal';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <Modal title={'test'} onClose={onClose}>
      Some text
    </Modal>
  );
};

export const Layout: React.FC = ({ children }) => {
  const [displayLogin, setDisplayLogin] = React.useState(false);
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <header className={styles.content}>
          <a href="/">
            <Logo />
          </a>
          <div className={styles.headerButtons}>
            <Button onClick={() => setDisplayLogin(true)}>Войти</Button>
            <Button use={'light'}>Регистрация</Button>
          </div>
          {displayLogin && <LoginModal onClose={() => setDisplayLogin(false)} />}
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
