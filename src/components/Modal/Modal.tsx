import React from 'react';
import { clsx } from 'clsx';

import Close from '../../img/close.svg';

import styles from './Modal.module.css';

interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width: React.CSSProperties['width'];
}

export const Modal: React.FC<Props> = ({ width, title, onClose, children }: Props) => {
  return (
    <div className={clsx(styles.modal, { [styles.modalActive]: true })} id="modal-card">
      <a href="#" className={styles.background} onClick={onClose}></a>
      <div style={{ width }} className={styles.content}>
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
