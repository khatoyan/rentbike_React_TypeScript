import React from 'react';
import cx from 'classnames';

import Close from '../../img/close.svg';

import styles from './Modal.module.css';

interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ title, onClose, children }: Props) => {
  return (
    <div className={cx(styles.modal, { [styles.modalActive]: true })} id="modal-card">
      <a href="#" className={styles.background} onClick={onClose}></a>
      <div className={styles.content}>
        <header className={styles.title}>
          <h2>{title}</h2>
          <a href="#" onClick={onClose}>
            <Close />
          </a>
        </header>
        {children}
      </div>
    </div>
  );
};