import React, { ChangeEvent } from 'react';
import cx from 'classnames';

import styles from './Input.module.css';

interface Props {
  type: 'text' | 'email' | 'password' | 'number' | 'month';
  id?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  warning?: boolean;
  onChange?: (value: string) => void;
  isShort?: boolean;
}

export const Input = ({ type, id, value, placeholder, required, error, warning, onChange, isShort }: Props) => {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return (
    <input
      type={type}
      id={id}
      className={cx(styles.input, {
        [styles.error]: error,
        [styles.warning]: warning,
        [styles.short]: isShort,
      })}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
    />
  );
};
