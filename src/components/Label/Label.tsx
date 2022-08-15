import React from 'react';
import cx from 'classnames';

import styles from './Label.module.css'

interface Props {
  hint?: boolean
  warning?: boolean
  error?: boolean
  htmlFor?: string
  children: React.ReactNode
}

export const Label = ({hint, warning, error, htmlFor, children}: Props) => {
  return (
    <label
      className={cx(
        styles.label,
        {
          [styles.hint]: hint,
          [styles.warning]: warning,
          [styles.error]: error
        }
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}
