import React from 'react';

import { EmailRow } from './components/EmailRow';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import styles from './UserSettings.module.css';
import { PasswordRow } from './components/PasswordRow';
import { CardRequisitesRow } from './components/CardRequisitesRow';

export const UserSettings = () => {
  return (
    <div>
      <PageHeader>Настройки</PageHeader>
      <section className={styles.settings}>
        <EmailRow />
        <PasswordRow />
        <CardRequisitesRow />
      </section>
    </div>
  );
};
