import React from 'react';
import styles from './PageHeader.module.css'

interface Props {
  children: React.ReactNode;
}

export const PageHeader = ({children}: Props) => {
  return (
    <h1 className={styles.header}>{children}</h1>
  )
}
