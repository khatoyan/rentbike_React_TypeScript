import React from 'react';
import styles from './Tabs.module.css';

export const Wrapper: React.FC = ({ children }) => {
  return <section className={styles.tabs}>{children}</section>;
};
