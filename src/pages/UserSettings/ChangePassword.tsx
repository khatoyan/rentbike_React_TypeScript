import React from 'react';
import styles from './UserSettings.module.css'
import {Button} from '../../components/Button/Button'

export const ChangePassword = () => {
  return (
    <div className={styles.row}>
      <div className={styles.content} style={{display: 'none'}}>
        <label className={styles.label}>Пароль</label>
        ••••••••
      </div>
      <form className={styles.content}>
        <label className={styles.label} htmlFor="settings-old-pass">Старый пароль</label>
        <div className={styles.formRow}>
          <input type="password" className="input" id="settings-old-pass" />
        </div>
        <label className={styles.label} htmlFor="settings-new-pass">Новый пароль</label>
        <div className={styles.formRow}>
          <input type="password" className="input" id="settings-new-pass" />
        </div>
        <label className={styles.label} htmlFor="settings-repeat-pass">Повторите
          пароль</label>
        <div className={styles.formRow}>
          <input type="password" className="input" id="settings-repeat-pass" />
        </div>
        <div className={styles.formRow}>
          <Button>Изменить</Button>
        </div>
      </form>
      <a className={styles.editLink}>Изменить</a>
    </div>
  )
}
