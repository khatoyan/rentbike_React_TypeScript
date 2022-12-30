import React from 'react';
import cx from 'classnames';
import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  light?: boolean;
  wide?: boolean;
  large?: boolean;
  link?: boolean;
}

export const Button: React.FC<Props> = ({
  disabled,
  className,
  onClick,
  link,
  children,
  light,
  wide,
  large,
}: Props) => {
  const clickHander = () => {
    if (disabled) return;
    onClick && onClick();
  };
  return (
    <a
      className={cx(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.light]: light,
        [styles.wide]: wide,
        [styles.large]: large,
        [styles.link]: link,
      })}
      onClick={clickHander}
    >
      {children}
    </a>
  );
};
