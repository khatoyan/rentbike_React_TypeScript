import React from 'react';
import styles from './Switcher.module.css';

interface Props {
  id: string;
  icon: React.ReactNode;
}

export const Item: React.FC<Props> = ({ id, icon }: Props) => {
  return (
    <>
      <input type="radio" name="catalog-type" checked className={styles.visuallyHidden} id={id} />
      <label className={styles.switch} htmlFor={id}>
        {icon}
      </label>
    </>
  );
};
