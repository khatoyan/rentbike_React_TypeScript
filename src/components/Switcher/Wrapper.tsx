import React from 'react';
import styles from './Switcher.module.css';

export const Wrapper: React.FC = ({ children }) => {
  return <div className={styles.switches}>{children}</div>;
};
