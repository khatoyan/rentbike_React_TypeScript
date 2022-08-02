import React from 'react';
import cx from 'classnames';
import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  use?: 'default' | 'light' | 'wide' | 'large' | 'combined';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({ disabled, className, onClick, use, children }: Props) => {
  const clickHander = () => {
    if (disabled) return;
    onClick();
  };
  return (
    <a
      className={cx(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.light]: use === 'light',
        [styles.wide]: use === 'wide' || use === 'combined',
        [styles.large]: use === 'large' || use === 'combined',
      })}
      onClick={clickHander}
    >
      {children}
    </a>
  );
};
