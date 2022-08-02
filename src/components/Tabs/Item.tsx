import React from 'react';
import cx from 'classnames';
import styles from './Tabs.module.css';

interface Props {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Item = ({ text, onClick, isActive }: Props) => {
  return (
    <a className={cx(styles.link, { [styles.active]: isActive })} onClick={onClick}>
      {text}
    </a>
  );
};
