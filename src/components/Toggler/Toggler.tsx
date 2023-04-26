import React from 'react';
import { useTheme } from '../../hooks/useTheme';

import styles from './Toggler.module.css';

interface Props {
  checked: boolean;
  onClick: () => void;
}

export const Toggler = ({ checked, onClick }: Props) => {
  return <input onClick={onClick} className={styles.toggler} type="checkbox" defaultChecked={checked} />;
};
