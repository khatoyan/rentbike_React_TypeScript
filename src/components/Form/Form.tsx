import React from 'react';
import { clsx } from 'clsx';

import styles from './Form.module.css';

interface FormProps {
  children: React.ReactNode;
}

export const Form = ({ children }: FormProps) => {
  return (
    <form action="" className={styles.form}>
      {children}
    </form>
  );
};

interface RowProps {
  children: React.ReactNode;
  center?: boolean;
}

export const Row = ({ children, center }: RowProps) => {
  return <div className={clsx(styles.row, { [styles.rowCenter]: center })}>{children}</div>;
};
