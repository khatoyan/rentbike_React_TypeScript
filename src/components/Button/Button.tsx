import React from 'react';
import cx from 'classnames';
import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  use?: 'default' | 'light' | 'wide' | 'large' | 'combined';
  disabled?: boolean;
  className?: string;
  light?: boolean;
  wide?: boolean;
  large?: boolean;
}

export const Button: React.FC<Props> = ({ disabled, className, onClick, use, children, light, wide, large }: Props) => {
  const clickHander = () => {
    if (disabled) return;
    onClick();
  };
  return (
    <a
      className={cx(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.light]: light,
        [styles.wide]: wide,
        [styles.large]: large,
      })}
      onClick={clickHander}
    >
      {children}
    </a>
  );
};
