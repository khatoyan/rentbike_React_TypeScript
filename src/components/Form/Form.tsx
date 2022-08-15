import React from 'react';
import cx from 'classnames';

import styles from './Form.module.css'

interface FormProps {
  children: React.ReactNode
}

export const Form = ({children}: FormProps) => {
  return (
    <form action="" className={styles.form}>
      {children}
    </form>
  )
}

interface RowProps {
  children: React.ReactNode
  center?: boolean
}

export const Row = ({children, center}: RowProps) => {
  return (
    <div className={cx(styles.row, {[styles.rowCenter]: center})}>
      {children}
    </div>
  )
}
