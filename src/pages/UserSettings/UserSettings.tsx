import React, { useEffect } from 'react';

import { EmailRow } from './components/EmailRow';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import styles from './UserSettings.module.css';
import { PasswordRow } from './components/PasswordRow';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { UserContext } from '../../context/UserContext';

export const UserSettings = () => {
  return (
    <div>
      <PageHeader>Настройки</PageHeader>
      <section className={styles.settings}>
        <EmailRow />
        <PasswordRow />
        <div className={styles.row}>
          <div className={styles.content}>
            <label className={styles.label}>Карта</label>
            •••• •••• •••• 2887
          </div>
          <form className={styles.content}>
            <label className={styles.label} htmlFor="settings-number">
              Карта
            </label>
            <div className={styles.formRow}>
              <Input type="text" placeholder="0000 0000 0000 0000" value="2887 2887 2887 2887" id="settings-number" />
            </div>
            <label className={styles.label} htmlFor="settings-date">
              Срок
            </label>
            <div className={styles.formRow}>
              <Input type="text" value="" placeholder="ММ/ГГ" id="settings-date" isShort />
            </div>
            <label className={styles.label} htmlFor="settings-cvv">
              CVV
            </label>
            <div className={styles.formRow}>
              <Input type="password" placeholder="•••" value="" isShort id="settings-cvv" />
            </div>
            <div className={styles.formRow}>
              <Button>Изменить</Button>
            </div>
          </form>
          <a className={styles.editLink}>Изменить</a>
        </div>
      </section>
    </div>
  );
};
